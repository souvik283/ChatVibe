import { Resend } from 'resend';
import "dotenv/config"
import {registerEmailFormat} from "./registerEmailFormat.js"
import {loginEmailFormat} from "./loginEmailFormat.js"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegisterEmail (name, email) {
    
  const { data, error } = await resend.emails.send({
    from: `ChatVibe <${process.env.FORM_EMAIL}>`,
    to: [email],
    subject: `Welcome ${name}`,
    html: registerEmailFormat(name),
  });

  if (error) {
    console.log(error)
    
  }

  console.log({ data });
};

export async function sendLoginEmail (name, email) {
  const html = await loginEmailFormat(name)
    // console.log(typeof html);
    
  const { data, error } = await resend.emails.send({
    from: `ChatVibe <${process.env.FORM_EMAIL}>`,
    to: [email],
    subject: `New Login Detected, ${name}`,
    html,
  });

  if (error) {
    console.log(error)
  }

  console.log({ data });
};