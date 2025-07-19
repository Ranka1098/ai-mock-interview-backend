import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, text) => {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error.message);
    return false;
  }
};

export default sendEmail;
