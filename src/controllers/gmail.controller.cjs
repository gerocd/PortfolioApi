const { Resend } = require("resend");
const resend = new Resend("re_EDeRDEfW_AEBbZGRjw6PFhEefN4V8thoh");

async function enviarCorreo(req, res) {
  try {
    const { from, to, subject, html } = req.body;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["geronimomcordoba@gmail.com"],
      subject: subject,
      html: html,
    });

    if (error) {
      return res.status(500).json({ error: error });
    }

    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al enviar el correo electrónico." });
  }
}

module.exports = { enviarCorreo };
