import { Resend } from 'resend';
import ENV from '../lib/env.js';
import {registerEmailFormat} from "./registerEmailFormat.js"
import {loginEmailFormat} from "./loginEmailFormat.js"

const resend = new Resend(ENV.resend_api_key);

export async function sendRegisterEmail (name, email) {
    
  const { data, error } = await resend.emails.send({
    from: `ChatVibe <${ENV.resend_from_email}>`,
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
    from: `ChatVibe <${ENV.resend_from_email}>`,
    to: [email],
    subject: `New Login Detected, ${name}`,
    html,
  });

  if (error) {
    console.log(error)
  }

  console.log({ data });
};