const nodemailer = require("nodemailer");

module.exports = async (email, subject, url) => {
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
      <h1>Email Confirmation Hiring Job</h1>
                    <h2>Hello ${email}</h2>
                    <p>Thank you for join us. Please confirm your email by clicking on the following link</p>
                    <a href='${url}'> Click here</a>
					          atau masuk ke link ${url}
                    </div>`,
    });
    // console.log("email sent successfully");
  } catch (error) {
    // console.log("email not sent!");
    console.log(error);
    return error;
  }
};
