import nodemailer from 'nodemailer'

export default async function SendOtp ({email , otp}){

    
    const transporter = nodemailer.createTransport({
        service : 'gmail' , 
        auth : {
            user : 'rohitsinghrajput964@gmail.com',
            pass : 'jchh sbnu rkiw ofwn'
        }
        
        
    })
    
    const mailOptions = {
        from : 'rohitsinghrajput964@gmail.com',
        to : email,
        subject : 'CollabSpace OTP',
        html : `
        <h3> <strong>Your otp is: </strong>${otp} </h3>
        <p>It will expire in 5 minutes </p>
        `
        
    }

    await transporter.sendMail(mailOptions);
    
}
  
