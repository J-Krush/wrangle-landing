#!/usr/bin/env node

/**
 * Send the feature survey email to trial users (Vercel KV) and/or
 * LemonSqueezy customers (CSV file).
 *
 * Usage:
 *   node scripts/send-survey.mjs --dry-run
 *   node scripts/send-survey.mjs --csv customers.csv
 *   node scripts/send-survey.mjs --csv customers.csv --dry-run
 *
 * Required env vars:
 *   RESEND_API_KEY
 *   KV_REST_API_URL
 *   KV_REST_API_TOKEN
 *
 * Tip: run `vercel env pull .env.local` to get these automatically.
 */

import { Resend } from 'resend';
import { createClient } from '@vercel/kv';
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

// ── Config ──
const SURVEY_URL = 'https://wrangleapp.dev/feedback';
const FROM_EMAIL = 'Wrangle <hello@wrangleapp.dev>';
const SUBJECT = 'what should wrangle build next?';
const RATE_LIMIT_DELAY_MS = 500; // delay between sends

// ── Parse args ──
const { values } = parseArgs({
  options: {
    csv: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
});

const dryRun = values['dry-run'];

// ── Gather emails ──
const emails = new Set();

// 1. Pull trial emails from Vercel KV
const kvUrl = process.env.KV_REST_API_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

if (kvUrl && kvToken) {
  console.log('Fetching trial emails from Vercel KV...');
  const kv = createClient({ url: kvUrl, token: kvToken });
  const keys = await kv.keys('trial:email:*');
  for (const key of keys) {
    const email = key.replace('trial:email:', '');
    emails.add(email.toLowerCase());
  }
  console.log(`  Found ${keys.length} trial emails`);
} else {
  console.log('Skipping Vercel KV (missing KV_REST_API_URL or KV_REST_API_TOKEN)');
}

// 2. Import CSV if provided
if (values.csv) {
  console.log(`Reading emails from ${values.csv}...`);
  const content = readFileSync(values.csv, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  let added = 0;
  for (const line of lines) {
    // Handle CSV with headers — skip lines that don't look like emails
    const candidate = line.split(',')[0].trim().replace(/"/g, '');
    if (candidate.includes('@') && candidate.includes('.')) {
      emails.add(candidate.toLowerCase());
      added++;
    }
  }
  console.log(`  Found ${added} emails from CSV`);
}

// ── Summary ──
const emailList = [...emails];
console.log(`\nTotal unique emails: ${emailList.length}`);

if (emailList.length === 0) {
  console.log('No emails to send. Exiting.');
  process.exit(0);
}

if (dryRun) {
  console.log('\n── DRY RUN — would send to: ──');
  emailList.forEach(e => console.log(`  ${e}`));
  process.exit(0);
}

// ── Send emails ──
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('Error: RESEND_API_KEY is required');
  process.exit(1);
}

const resend = new Resend(apiKey);

const emailHtml = `
<div style="font-family:monospace;background:#0F0F12;color:#E5E5E5;padding:32px;border-radius:8px;max-width:560px;">
  <img src="https://wrangleapp.dev/images/wrangle-logo-13.png" alt="wrangle" width="40" height="40" style="border-radius:6px;margin-bottom:20px;" />
  <h2 style="margin:0 0 12px;font-size:18px;">what should we build next?</h2>
  <p style="color:#A3A3A3;font-size:14px;line-height:1.6;margin:0 0 24px;">
    we're planning the next round of features for wrangle and want your input.
    take 30 seconds to rank what matters most to you.
  </p>
  <a href="${SURVEY_URL}" style="display:inline-block;background:linear-gradient(to bottom,#3DB8A8,#2D9B8C);color:#0C0C0C;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
    take the survey
  </a>
  <p style="color:#737373;font-size:11px;margin-top:32px;">
    you're receiving this because you signed up for wrangle.
    no further emails will be sent from this survey.
  </p>
</div>
`;

let sent = 0;
let failed = 0;

for (const email of emailList) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: SUBJECT,
      html: emailHtml,
    });
    sent++;
    console.log(`  ✓ ${email}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${email}: ${err.message}`);
  }

  // Rate limit
  if (sent + failed < emailList.length) {
    await new Promise(r => setTimeout(r, RATE_LIMIT_DELAY_MS));
  }
}

console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
