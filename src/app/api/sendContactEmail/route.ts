// pages/api/sendEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';



export async function POST(req: NextRequest) {
  const { subject, message } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS, // sender address
      to: process.env.EMAIL_ADDRESS, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return NextResponse.json({ status: 200, message: 'Email sent successfully'})
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ status: 500, message: 'Failed to send email'})
  }
}
