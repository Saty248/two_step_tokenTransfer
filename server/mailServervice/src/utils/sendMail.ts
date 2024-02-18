import nodeMailer, { Transport } from "nodemailer"
import {google} from "googleapis"
import 'dotenv/config'


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET =  process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL ="mondal.sayantan1234@gmail.com"


const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  

  const createTransporter=async ()=>{
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log("*ERR: ", err)
            reject();
          }
          resolve(token); 
        });
      });

      
 let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user:MY_EMAIL,
      clientId:CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken as string
    },
  });
  const mailOptions={
    from:"mondal.sayantan1234@gmail.com",
    to:"mondal.sayantan1234@gmail.com",
    subject:"hello",
    text:"world"
}
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error)
    }else{
        console.log("success")
        console.log(info)
    }
}) 

  }
  createTransporter();


