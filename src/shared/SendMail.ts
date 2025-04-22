import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "junayetshiblu0@gmail.com",
    pass: "wspe wtre nizu sele",
  },
});

export async function sendMail (email:string, content:string) {
  const info = await transporter.sendMail({
    from: '"ph health care 👻" <junayetshiblu0@gmail.com>', 
    to:email, 
    subject: "Reset Password", 
    html: content, 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

