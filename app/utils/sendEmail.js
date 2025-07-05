import nodemailer from 'nodemailer'


export const sendEmail = async ({to , title , description }) =>{

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'rohitsinghrajput964@gmail.com',
            pass: 'jchh sbnu rkiw ofwn'
        }
    })
    
    const mailOptions = {
        from:'rohitsinghrajput964@gmail.com',
        to,
        subject: 'New Task Assigned',
        html : `
        <h2> Greetings, You have a new task assigned </h2>
        
        <p> <strong> Task: </strong> ${title} </p>
        <p> <strong> Description: </strong> ${description} </p>
        
        `
    }

    await transporter.sendMail(mailOptions)

}