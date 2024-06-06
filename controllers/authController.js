const clientSignupSchema = require("../models/userSignup");
const nodemailer = require("../utilities/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const emailRejex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRejex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// user signup post
exports.userSignup = async (req, res) => {
  const { name, email, mobNo, password } = req.body;
  const hashPas = await bcrypt.hash(password, 10);

  const emailCheck = await clientSignupSchema.findOne({ email: email });
  if (emailCheck && emailCheck.status == "Active") {
    res.status(200).json("email already used");
  } else if (emailCheck && emailCheck.status=='pending'){
    
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "OTP Verification",

        text: `OTP message from GreenLand
              Your OTP for signup is: ${otp}`,
      };

      nodemailer.sentEmailOtp(mailOptions);
      const userData = await clientSignupSchema.findOne({ email: email });
      if (userData) {
          await clientSignupSchema.findOneAndUpdate(
            {
              email: email,
            },
            {
              $set: {
                otp: otp
              },
            }
          );
        } 
      res.status(200).json('status pending otp sent')


  }else if (!passwordRejex.test(password) || !emailRejex.test(email)) {
    res.status(200).json("incorrect email or password");
  } else {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    let userSignup = new clientSignupSchema({
      name: name,
      email: email,
      mobNo: mobNo,
      password: hashPas,
      category: "user",
      otp: otp,
    });

    if (userSignup) {
      await userSignup.save();

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "OTP Verification",

        text: `OTP message from GreenLand
              Your OTP for signup is: ${otp}`,
      };

      nodemailer.sentEmailOtp(mailOptions);

      res.status(200).json("recived ");
    }
  }
};


// contractor signup post
exports.contractorSignup = async (req, res) => {
    const { name, email, mobNo, password } = req.body;
    const hashPas = await bcrypt.hash(password, 10);
  
    const emailCheck = await clientSignupSchema.findOne({ email: email });
    if (emailCheck && emailCheck.status == "Active") {
      res.status(200).json("email already used");
    } else if (emailCheck && emailCheck.status=='pending'){
      
      const otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
  
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: "OTP Verification",
  
          text: `OTP message from GreenLand
                Your OTP for signup is: ${otp}`,
        };
  
        nodemailer.sentEmailOtp(mailOptions);
        const userData = await clientSignupSchema.findOne({ email: email });
        if (userData) {
            await clientSignupSchema.findOneAndUpdate(
              {
                email: email,
              },
              {
                $set: {
                  otp: otp
                },
              }
            );
          } 
        res.status(200).json('status pending otp sent')
  
  
    }else if (!passwordRejex.test(password) || !emailRejex.test(email)) {
      res.status(200).json("incorrect email or password");
    } else {
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
  
      let userSignup = new clientSignupSchema({
        name: name,
        email: email,
        mobNo: mobNo,
        password: hashPas,
        category: "contractor",
        otp: otp,
      });
  
      if (userSignup) {
        await userSignup.save();
  
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: "OTP Verification",
  
          text: `OTP message from GreenLand
                Your OTP for signup is: ${otp}`,
        };
  
        nodemailer.sentEmailOtp(mailOptions);
  
        res.status(200).json("recived ");
      }
    }
};


// otp post
exports.signupOtp = async (req, res) => {
  const { otp, userEmail } = req.body;
  const userData = await clientSignupSchema.findOne({ email: userEmail });
  if (userData) {
    if (userData.otp === otp) {
      await clientSignupSchema.findOneAndUpdate(
        {
          email: userEmail,
        },
        {
          $set: {
            status: "Active",
            otp: "",
          },
        }
      );
      res.status(200).json("otp verification success");
    } else {
      res.status(200).json("otp verification failed");
    }
  }
};
