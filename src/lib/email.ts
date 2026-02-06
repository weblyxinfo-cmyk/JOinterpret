import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Jaroslav Oláh <noreply@jaroslavolah.cz>";
const MANAGER_EMAIL = process.env.MANAGER_EMAIL || "management@jaroslavolah.cz";

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  type: string;
  eventDate: string;
}) {
  const typeLabels: Record<string, string> = {
    CLUB: "Klub / Koncert",
    FESTIVAL: "Festival",
    PRIVATE: "Soukromá akce",
    CORPORATE: "Firemní event",
  };

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Potvrzení booking requestu – Jaroslav Oláh",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C6A336;">Děkujeme za váš požadavek!</h1>
        <p>Dobrý den, ${data.name},</p>
        <p>Váš booking request byl úspěšně přijat. Management se vám ozve do 48 hodin.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Typ akce</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${typeLabels[data.type] || data.type}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Datum</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(data.eventDate).toLocaleDateString("cs-CZ")}</td></tr>
        </table>
        <p style="color: #999; font-size: 12px;">Jaroslav Oláh Management</p>
      </div>
    `,
  });
}

export async function sendBookingNotification(data: {
  name: string;
  email: string;
  type: string;
  eventDate: string;
  location?: string | null;
  budget?: string | null;
  id: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: MANAGER_EMAIL,
    subject: `Nový booking request: ${data.name} – ${data.type}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C6A336;">Nový Booking Request</h1>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Jméno</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Typ</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.type}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Datum</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(data.eventDate).toLocaleDateString("cs-CZ")}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Místo</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.location || "—"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #999;">Rozpočet</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget || "—"}</td></tr>
        </table>
        <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/booking/${data.id}" style="display: inline-block; background: #C6A336; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold;">Zobrazit v admin panelu &rarr;</a>
      </div>
    `,
  });
}

export async function sendVipConfirmation(data: {
  name: string;
  email: string;
  type: string;
  qrCodeDataUrl: string;
  concertId?: string | null;
}) {
  const typeLabel = data.type === "MEET_GREET" ? "Meet & Greet" : "Backstage Pass";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `VIP ${typeLabel} – Potvrzení objednávky`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C6A336;">VIP ${typeLabel}</h1>
        <p>Dobrý den, ${data.name},</p>
        <p>Vaše VIP objednávka byla úspěšně zaplacena. Níže najdete váš QR kód, který předložíte na místě.</p>
        <div style="text-align: center; margin: 30px 0;">
          <img src="${data.qrCodeDataUrl}" alt="QR kód" style="width: 200px; height: 200px;" />
        </div>
        <p style="text-align: center; color: #999; font-size: 12px;">Tento QR kód si uložte nebo vytiskněte.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">Jaroslav Oláh Management</p>
      </div>
    `,
  });
}
