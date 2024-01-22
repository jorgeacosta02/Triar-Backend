import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const { NODEMAILER_USER, NODEMAILER_PASS, DESTINATION_EMAIL } = process.env;

const postContactController = async (req: Request, res: Response) => {
  try {
    const {name,email,subject,message} = req.body;
    // inicia la funcion de recibir el mensaje
    let transporter = nodemailer.createTransport({
      //options -- define los datos de conexión
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // host: "smtp.mail.yahoo.com",
      // port: 465,
      // secure: true,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado
      },
    });
    // se fusionará en cada objeto de mensaje.
    let mailOptions = {
      from: NODEMAILER_USER,
      to: DESTINATION_EMAIL,
      subject,
      html: `<html>
	<head>
        <body>
        <h3 style="color:#9E7842">Datos del usuario:<h3>
        <p><b>Nombre:</b> ${name}.</p>
        <p><b>Correo electrónico:</b> ${email}</p>
        </br>
        <h3 style="color:#9E7842">Mensaje:</h3>
        <p>${message}.<p>
		</body>
	</head>
</html>`,
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      console.log("Error in sendMail callback:", error);
      if (error) {
        return res.status(500).send(error.message)
      } else {
       return res.status(200).send("it was sent satisfactorily")
      }
    });
  } catch (error) {
    console.log("Error in catch block:", error);
    if (error instanceof Error) {
      console.log(error.message);
     return res.status(500).send(error.message)
    } else {
      console.log("Unexpected error");
      return res.status(500).send("Unexpected error")
    }
  }
};

export default postContactController;