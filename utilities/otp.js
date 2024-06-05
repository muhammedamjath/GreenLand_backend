const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },  
  });



exports.sentEmailOtp=async(mailoptions)=>{

    await transporter.sendMail(mailoptions)
}

