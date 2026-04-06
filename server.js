const nodemailer = require("nodemailer");

app.post("/api/contact", upload.none(), async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Pflichtfelder fehlen" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Kontakt" <${process.env.MAIL_USER}>`,
      to: "kontakt@carlas-portfolio.com",
      subject: "Neue Anfrage über Portfolio",
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Firma:</strong> ${company || "-"}</p>
        <p><strong>Nachricht:</strong><br>${message}</p>
      `
    });

    res.json({ message: "Mail gesendet ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Mail konnte nicht gesendet werden ❌" });
  }
});