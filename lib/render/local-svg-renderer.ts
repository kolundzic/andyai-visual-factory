export function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildFactorySvg(input: {
  title: string;
  subtitle: string;
  jobKey: string;
  outputType: string;
  stage: string;
}) {
  const title = escapeXml(input.title.slice(0, 78));
  const subtitle = escapeXml(input.subtitle.slice(0, 150));
  const jobKey = escapeXml(input.jobKey);
  const outputType = escapeXml(input.outputType);
  const stage = escapeXml(input.stage);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AndyAI Visual Factory rendered asset">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff8ef"/>
      <stop offset="55%" stop-color="#f7fbff"/>
      <stop offset="100%" stop-color="#eef6ff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="1330" cy="130" r="180" fill="#dbeafe" opacity="0.45"/>
  <circle cx="140" cy="760" r="210" fill="#fee2e2" opacity="0.38"/>

  <g filter="url(#shadow)">
    <rect x="110" y="110" width="1380" height="680" rx="42" fill="#ffffff" stroke="#dbe4f0" stroke-width="2"/>
  </g>

  <text x="160" y="190" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="8" fill="#e11d48">ANDYAI VISUAL FACTORY</text>
  <text x="160" y="285" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="900" fill="#0f172a">${title}</text>
  <text x="160" y="350" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="500" fill="#475569">${subtitle}</text>

  <g transform="translate(160, 440)">
    <rect x="0" y="0" width="250" height="145" rx="26" fill="#f8fafc" stroke="#dbe4f0"/>
    <text x="28" y="52" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#64748b">01 REQUEST</text>
    <text x="28" y="98" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#0f172a">Captured</text>

    <rect x="290" y="0" width="250" height="145" rx="26" fill="#f8fafc" stroke="#dbe4f0"/>
    <text x="318" y="52" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#64748b">02 JOB</text>
    <text x="318" y="98" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#0f172a">${stage}</text>

    <rect x="580" y="0" width="250" height="145" rx="26" fill="#f8fafc" stroke="#dbe4f0"/>
    <text x="608" y="52" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#64748b">03 RENDER</text>
    <text x="608" y="98" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#0f172a">SVG ready</text>

    <rect x="870" y="0" width="250" height="145" rx="26" fill="#f8fafc" stroke="#dbe4f0"/>
    <text x="898" y="52" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#64748b">04 ASSET</text>
    <text x="898" y="98" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#0f172a">${outputType}</text>
  </g>

  <g transform="translate(160, 660)">
    <rect x="0" y="0" width="1118" height="64" rx="20" fill="#0f172a"/>
    <text x="28" y="41" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff">Job: ${jobKey}</text>
  </g>
</svg>`;
}
