import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const FEATURE_LABELS: Record<string, string> = {
  'vim-mode': 'Vim mode keybindings',
  'git-integration': 'Built-in git status & diff',
  'split-panes': 'Split pane editing',
  'ai-autocomplete': 'AI-powered autocomplete',
  'snippets': 'Custom code snippets / templates',
  'remote-ssh': 'Remote file editing via SSH',
  'collaboration': 'Real-time collaboration',
  'plugin-system': 'Plugin / extension system',
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response('Server configuration error', { status: 500 });
  }

  const resend = new Resend(apiKey);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response('Invalid form data', { status: 400 });
  }

  // Extract rankings
  const rankings: { feature: string; label: string; rank: number }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('rank-')) {
      const featureId = key.replace('rank-', '');
      rankings.push({
        feature: featureId,
        label: FEATURE_LABELS[featureId] || featureId,
        rank: Number(value),
      });
    }
  }

  rankings.sort((a, b) => a.rank - b.rank);

  const openIdeas = (formData.get('open-ideas') as string | null)?.trim() || '';

  // Build email HTML
  const rankingsHtml = rankings
    .map(r => `<tr><td style="padding:8px 16px;color:#A3A3A3;">${r.rank}</td><td style="padding:8px 16px;color:#E5E5E5;">${r.label}</td></tr>`)
    .join('');

  const openIdeasHtml = openIdeas
    ? `<h3 style="color:#E5E5E5;margin-top:24px;">Open Ideas</h3><p style="color:#A3A3A3;white-space:pre-wrap;">${openIdeas}</p>`
    : '';

  const html = `
    <div style="font-family:monospace;background:#0F0F12;color:#E5E5E5;padding:32px;border-radius:8px;">
      <h2 style="color:#3DB8A8;margin-bottom:16px;">New Feature Survey Response</h2>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr style="border-bottom:1px solid #27272A;">
            <th style="padding:8px 16px;text-align:left;color:#737373;">Rank</th>
            <th style="padding:8px 16px;text-align:left;color:#737373;">Feature</th>
          </tr>
        </thead>
        <tbody>${rankingsHtml}</tbody>
      </table>
      ${openIdeasHtml}
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'Wrangle Survey <hello@wrangleapp.dev>',
      to: 'support@wrangleapp.dev',
      subject: 'New Feature Survey Response',
      html,
    });
  } catch (err) {
    console.error('Failed to send survey email:', err);
    return new Response('Failed to send feedback', { status: 500 });
  }

  return redirect('/feedback?submitted=true', 302);
};
