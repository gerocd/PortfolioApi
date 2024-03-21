const { Resend } = require("resend");
const resend = new Resend("re_EDeRDEfW_AEBbZGRjw6PFhEefN4V8thoh");

// Define una función que enviará el correo electrónico
async function enviarCorreo(req, res) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { from, to, subject, html } = req.body;

    // Envía el correo electrónico utilizando los datos proporcionados desde el frontend
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Remitente fijo
      to: ["geronimomcordoba@gmail.com"], // Utiliza el destinatario proporcionado en la solicitud
      subject: subject, // Utiliza el asunto proporcionado en la solicitud
      html: html, // Utiliza el contenido HTML proporcionado en la solicitud
    });

    // Manejar errores si los hay
    if (error) {
      return res.status(500).json({ error: error });
    }

    // Si no hay errores, se envió el correo electrónico exitosamente
    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al enviar el correo electrónico." });
  }
}

module.exports = { enviarCorreo };
