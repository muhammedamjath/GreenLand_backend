
// signup success email 
exports.signupSuccess=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Completed</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .footer {
                background-color: #f4f4f4;
                color: #666;
                padding: 20px;
                text-align: center;
                font-size: 12px;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Signup Successful!</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>Welcome to GreenLand, your one-stop solution for finding the best contractors and engineers for all your house and trade work needs! Your signup process is now complete, and you can start exploring our services right away.</p>
                <p>Here’s what you can do next:</p>
                <ul>
                    <li>Browse our extensive list of qualified contractors and engineers.</li>
                    <li>Read reviews and ratings to find the best professionals for your projects.</li>
                    <li>Contact and hire professionals directly through our platform.</li>
                </ul>
                <p>If you need any assistance or have any questions, our support team is here to help you. Feel free to reach out to us anytime.</p>
                <p>Thank you for choosing GreenLand, and we look forward to helping you with all your home and trade work projects.</p>
                <p>Best regards,</p>
                <p>The GreenLand Team</p>
            </div>
            <div class="footer">
                <p>Need help? <a href="https://www.greenland.com/support">Contact our support team</a></p>
                <p>Follow us on:</p>
                <p>
                    <a href="https://www.facebook.com/greenland">Facebook</a> |
                    <a href="https://www.twitter.com/greenland">Twitter</a> |
                    <a href="https://www.instagram.com/greenland">Instagram</a>
                </p>
                <p>&copy; 2024 GreenLand. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`


// reset password success
exports.resetPasswordSuccess = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .footer {
                background-color: #f4f4f4;
                color: #666;
                padding: 20px;
                text-align: center;
                font-size: 12px;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Successful</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>We wanted to let you know that your password has been successfully reset. You can now log in to your GreenLand account using your new password.</p>
                <p>If you did not request this change, please contact our support team immediately to secure your account.</p>
                <p>Thank you for using GreenLand. We are committed to providing you with the best service for all your house and trade work needs.</p>
                <p>Best regards,</p>
                <p>The GreenLand Team</p>
            </div>
            <div class="footer">
                <p>Need help? <a href="https://www.greenland.com/support">Contact our support team</a></p>
                <p>Follow us on:</p>
                <p>
                    <a href="https://www.facebook.com/greenland">Facebook</a> |
                    <a href="https://www.twitter.com/greenland">Twitter</a> |
                    <a href="https://www.instagram.com/greenland">Instagram</a>
                </p>
                <p>&copy; 2024 GreenLand. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
    
// signup otp email template
const emailTemplate=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                background-color: #f1f1f1;
                padding: 10px;
                border-radius: 4px;
                display: inline-block;
                margin: 20px 0;
            }
            .footer {
                background-color: #f4f4f4;
                color: #666;
                padding: 20px;
                text-align: center;
                font-size: 12px;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to GreenLand!</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>Thank you for signing up with GreenLand. To complete your registration, please use the One-Time Password (OTP) below:</p>
                <div class="otp">{{OTP}}</div>
                <p> Please do not share it with anyone.</p>
                <p>If you did not initiate this request, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>Need help? <a href="https://www.greenland.com/support">Contact our support team</a></p>
                <p>Follow us on:</p>
                <p>
                    <a href="https://www.facebook.com/greenland">Facebook</a> |
                    <a href="https://www.twitter.com/greenland">Twitter</a> |
                    <a href="https://www.instagram.com/greenland">Instagram</a>
                </p>
                <p>&copy; 2024 GreenLand. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`

// signup otp email function
exports.generateEmailContent=(otp)=>{
        return emailTemplate.replace('{{OTP}}',otp)
      }

// reset password otp
const resetPasswordOTP = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>We received a request to reset your password. Your One-Time Password (OTP) to reset your password is: <span class="otp">{{OTP}}</span></p>
            <p>Please use this code to reset your password.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you for using our service.</p>
            <p>Best regards,</p>
            <p>The GreenLand Team</p>
        </div>
        <div class="footer">
            <p>Need help? <a href="https://www.greenland.com/support">Contact our support team</a></p>
            <p>Follow us on:</p>
            <p>
                <a href="https://www.facebook.com/greenland">Facebook</a> |
                <a href="https://www.twitter.com/greenland">Twitter</a> |
                <a href="https://www.instagram.com/greenland">Instagram</a>
            </p>
            <p>&copy; 2024 GreenLand. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

// reset password otp function
exports.resetPasswordOTP=(otp)=>{
    return resetPasswordOTP.replace('{{OTP}}',otp)
}


// contractor notification
exports.connectionRequestMail = (contractorName, userName, companyName, requestDate) => {
    const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Connection Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .details {
            text-align: left;
            margin: 20px 0;
        }
        .detail-item {
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            color: #333;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Connection Request!</h1>
        </div>
        <div class="content">
            <p>Dear ${contractorName},</p>
            <p>You have received a new connection request from <strong>${userName}</strong> for the company <strong>${companyName}</strong> on GreenLand.</p>
            <div class="details">
                <div class="detail-item">
                    <span class="detail-label">User Name:</span> ${userName}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Company Name:</span> ${companyName}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Request Date:</span> ${requestDate}
                </div>
            </div>
            <p>Please log in to your GreenLand account to review the request and take the necessary action.</p>
            <p>Thank you for using GreenLand, and we look forward to helping you connect with more clients.</p>
            <p>Best regards,</p>
            <p>The GreenLand Team</p>
        </div>
        <div class="footer">
            <p>Need help? <a href="https://www.greenland.com/support">Contact our support team</a></p>
            <p>Follow us on:</p>
            <p>
                <a href="https://www.facebook.com/greenland">Facebook</a> |
                <a href="https://www.twitter.com/greenland">Twitter</a> |
                <a href="https://www.instagram.com/greenland">Instagram</a>
            </p>
            <p>&copy; 2024 GreenLand. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
    return template;
}

// connection approved email
exports.connectionApprovalMail = (userName , companyName, workCategory) => {
    const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connection Request Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Connection Request Approved!</h1>
        </div>
        <div class="content">
            <p>Dear ${userName},</p>
            <p>Your request has been accepted by <strong>${companyName}</strong> for the <strong>${workCategory}</strong> work. You will be connected shortly to proceed with your project. Thank you for using GreenLand!</p>
            <p>Best regards,</p>
            <p>The GreenLand Team</p>
        </div>
        <div class="footer">
            <p>Need assistance? <a href="https://www.greenland.com/support">Contact our support team</a></p>
            <p>Stay connected:</p>
            <p>
                <a href="https://www.facebook.com/greenland">Facebook</a> |
                <a href="https://www.twitter.com/greenland">Twitter</a> |
                <a href="https://www.instagram.com/greenland">Instagram</a>
            </p>
            <p>&copy; 2024 GreenLand. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
    return template;
}
