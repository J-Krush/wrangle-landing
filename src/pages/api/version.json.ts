export async function GET() {
  const version = import.meta.env.APP_VERSION;
  return new Response(
    JSON.stringify({
      version,
      download_url: `https://dl.wrangleapp.dev/Wrangle-${version}.dmg`,
      release_notes: "Latest release.",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
