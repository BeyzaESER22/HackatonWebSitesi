import { Resend } from 'resend';
import { SITE } from '@/lib/constants';

let resendClient = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

function teamStatusLabel(application) {
  if (application.teamStatus === 'has_team') {
    return application.teamSize
      ? `Hazır takımınla katılıyorsun (${application.teamSize} kişi).`
      : 'Hazır takımınla katılıyorsun.';
  }
  if (application.teamStatus === 'will_form') {
    return 'Etkinlik günü seni uygun ekiplerle eşleştireceğiz.';
  }
  return 'Bireysel katılım tercihini aldık.';
}

function buildConfirmationHtml(application) {
  const projectIdea = application.projectIdea?.trim()
    ? `<p style="margin:16px 0 0;color:#5f6988;line-height:1.7;"><strong>Proje fikri:</strong> ${application.projectIdea}</p>`
    : '';

  return `
    <div style="background:#081129;padding:32px 20px;font-family:Inter,Arial,sans-serif;color:#eef2ff;">
      <div style="max-width:640px;margin:0 auto;background:linear-gradient(180deg,#121a3a 0%,#0c122c 100%);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;">
        <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#98a6cf;margin-bottom:12px;">HackFest'26 Başvuru Onayı</div>
        <h1 style="font-size:32px;line-height:1.1;margin:0 0 16px;color:#ffffff;">Başvurun bize ulaştı, ${application.fullName}.</h1>
        <p style="margin:0;color:#c1cae4;line-height:1.8;">
          HackFest'26 hackathon başvurunu başarıyla aldık. Organizasyon ekibi başvuruları değerlendirdikten sonra seninle e-posta üzerinden iletişime geçeceğiz.
        </p>

        <div style="margin-top:24px;padding:20px;border-radius:18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 10px;color:#ffffff;"><strong>Takım durumu:</strong> ${teamStatusLabel(application)}</p>
          <p style="margin:0;color:#c1cae4;"><strong>Tarih:</strong> ${SITE.eventDates}</p>
          <p style="margin:10px 0 0;color:#c1cae4;"><strong>Konum:</strong> ${SITE.location.full}</p>
          ${projectIdea}
        </div>

        <p style="margin:24px 0 0;color:#98a6cf;line-height:1.8;">
          Soruların olursa <a href="mailto:${SITE.email}" style="color:#8fb0ff;text-decoration:none;">${SITE.email}</a> adresinden bize ulaşabilirsin.
        </p>
      </div>
    </div>
  `;
}

function buildConfirmationText(application) {
  const lines = [
    `Merhaba ${application.fullName},`,
    '',
    'HackFest\'26 hackathon başvurunu aldık.',
    'Başvurular değerlendirildikten sonra seninle e-posta üzerinden iletişime geçeceğiz.',
    '',
    `Takım durumu: ${teamStatusLabel(application)}`,
    `Tarih: ${SITE.eventDates}`,
    `Konum: ${SITE.location.full}`,
  ];

  if (application.projectIdea?.trim()) {
    lines.push('', `Proje fikri: ${application.projectIdea.trim()}`);
  }

  lines.push('', `İletişim: ${SITE.email}`);
  return lines.join('\n');
}

export async function sendHackathonConfirmationEmail(application) {
  const resend = getResendClient();

  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return { skipped: true, reason: 'missing-config' };
  }

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [application.email],
    subject: "HackFest'26 Başvurun Alındı",
    html: buildConfirmationHtml(application),
    text: buildConfirmationText(application),
    replyTo: process.env.RESEND_REPLY_TO || SITE.email
  });

  if (error) {
    throw new Error(error.message || 'Resend error');
  }

  return { skipped: false, id: data?.id || null };
}
