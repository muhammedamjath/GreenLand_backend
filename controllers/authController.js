const clientSignupSchema = require("../models/userSignup");
const nodemailer = require("../utilities/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const emailContent = require("../utilities/emailContent");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/clientRouter");

const emailRejex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRejex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const GenerateOtp = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};

// user signup post
exports.userSignup = async (req, res) => {
  const { name, email, mobNo, password } = req.body;
  const hashPas = await bcrypt.hash(password, 10);

  const emailCheck = await clientSignupSchema.findOne({ email: email });
  if (emailCheck && emailCheck.status == "Active") {
    res.status(200).json("email already used");
  } else if (emailCheck && emailCheck.status == "pending") {
    const otp = GenerateOtp();
    const sentMail = await emailContent.generateEmailContent(otp);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "OTP Verification",

      html: sentMail,
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
            otp: otp,
          },
        }
      );
    }
    res.status(200).json("status pending otp sent");
  } else if (!passwordRejex.test(password) || !emailRejex.test(email)) {
    res.status(200).json("incorrect email or password");
  } else {
    const otp = GenerateOtp();
    const sentMail = emailContent.generateEmailContent(otp);
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

        html: sentMail,
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
  } else if (emailCheck && emailCheck.status == "pending") {
    const otp = GenerateOtp();
    const sentMail = generateEmailContent(otp);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "OTP Verification",

      html: sentMail,
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
            otp: otp,
          },
        }
      );
    }
    res.status(200).json("status pending otp sent");
  } else if (!passwordRejex.test(password) || !emailRejex.test(email)) {
    res.status(200).json("incorrect email or password");
  } else {
    const otp = GenerateOtp();
    const sentMail = generateEmailContent(otp);

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

        text: sentMail,
      };

      nodemailer.sentEmailOtp(mailOptions);

      res.status(200).json("recived ");
    }
  }
};

// otp post
exports.signupOtp = async (req, res) => {
  const { otp, userEmail } = req.body;
  if (otp == "") {
    const otpGenerate = GenerateOtp();
    const sentMail = emailContent.generateEmailContent(otpGenerate);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: "OTP Verification",

      html: sentMail,
    };

    nodemailer.sentEmailOtp(mailOptions);
    const userData = await clientSignupSchema.findOne({ email: userEmail });
    if (userData) {
      await clientSignupSchema.findOneAndUpdate(
        {
          email: userEmail,
        },
        {
          $set: {
            otp: otpGenerate,
          },
        }
      );
    }
    res.status(200).json("status pending otp sent");
  } else {
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

        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: userData.email,
          subject: "Signup Successful!",

          html: emailContent.signupSuccess,
        };
        nodemailer.sentEmailOtp(mailOptions);

        res.status(200).json("otp verification success");
      } else {
        res.status(200).json("otp verification failed");
      }
    }
  }
};

// reset pass email
exports.resetPassEmail = async (req, res) => {
  const { email, password } = req.body;

  const user = await clientSignupSchema.findOne({ email: email });

  if (user && password == "") {
    const otpGenerate = GenerateOtp();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Reset password OTP Verification",

      html: emailContent.resetPasswordOTP(otpGenerate),
    };

    nodemailer.sentEmailOtp(mailOptions);

    await clientSignupSchema.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          otp: otpGenerate,
        },
      }
    );

    res.status(200).json("email sent");
  } else if (user && password) {
    const hashPas = await bcrypt.hash(password, 10);

    await clientSignupSchema.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          password: hashPas,
        },
      }
    );
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: " password Updated successfully",

      html: emailContent.resetPasswordSuccess,
    };

    nodemailer.sentEmailOtp(mailOptions);
    res.status(200).json("password updated");
  } else {
    res.status(200).json("no user data fount");
  }
};

// reset pass otp post
exports.resetPasswordOtp = async (req, res) => {
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
            otp: "",
          },
        }
      );
      res.status(200).json("otp verification success");
    } else {
      res.status(200).json("otp verification failed");
    }
  } else {
    res.status(200).json("no user fount");
  }
};

// login post
exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await clientSignupSchema.findOne({ email: email });

  if (user) {
    if (user.status == "Active") {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const id = { id: user._id };
        const token = jwt.sign(id, process.env.JWT_TOCKEN_SECERT);
        res.status(200).json({
          status:'success',
          data: {
            id: user._id,
            email: user.email,
            category: user.category,
          },
          token: token,
        });
      } else {
        res.status(200).json({status:'incorrect password'});
      }
    }
  } else {
    res.status(200).json({status:'userData not fount'});
  }
};
