const nodemailer = require("nodemailer");

module.exports = async (email, nama_perushan, project, name, phone, deskripsi, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // service: process.env.SMTP_SERVICE,
      // port: Number(process.env.SMTP_EMAIL_PORT),
      // secure: Boolean(process.env.SMTP_SECURE),
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to: email,
      subject: subject,
      html: `
      <img src="https://cdn.discordapp.com/attachments/1118733891738554480/1147721385767080047/Screenshot_119-removebg-preview.png" style="width: 200px;height: 100%;"/>

    <div style="padding:20px">
      <p>
        Dear ${name}
      </p>
      <p>
      We would like to express our gratitude for your interest in the ${project}role at our company,  ${nama_perushan} After reviewing your application, we are pleased to invite you for an interview with us.
      </p>
      <p>
        Position: ${project}
      </p>
    <p>
        Description: ${deskripsi}
      </p>
      <p>
      During the interview, we will further discuss your experiences, skills, and how you can contribute to our team. We will also provide you with an opportunity to learn more about our company and address any questions you may have about the position.
      </p>
      <p>
      Please confirm your availability for this interview by replying to this email or contacting us at  ${phone}by [Confirmation Deadline] so that we can schedule accordingly.
      </p>
      <p>
       
      </p>
    </div>
`,
    });
    // console.log("email sent successfully");
  } catch (error) {
    // console.log("email not sent!");
    console.log(error);
    return error;
  }
};
