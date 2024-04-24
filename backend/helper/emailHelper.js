const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.APP_EMAIL,
        pass:process.env.APP_PASSWORD,
    }
})

const inviteMail = async(to)=>{
    await transport.sendMail({
        from:process.env.APP_EMAIL,
        to,
        subject:'Register Invitation',
        text:'You have been invited to register with the portal with the link attached below'
    })
}

const otpMail = async(to, text)=>{
    await transport.sendMail({
        from:process.env.APP_EMAIL,
        to,
        subject:'OTP verification',
        text,
    })
}

module.exports = {inviteMail, otpMail};