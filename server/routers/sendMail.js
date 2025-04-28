import { Router } from "express";
import sgMail from "@sendgrid/mail";

const router = Router();
console.log("apikey", process.env.SENDGRID_API_KEY);
console.log("sendmail", process.env.SENDGRID_EMAIL);
console.log("apiurl", process.env.API_URL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Create estimate route
router.post("/", async (request, response) => {
  console.log(request.body);
  try {
    const toEmail = request.body;

    const msg = {
      to: process.env.SENDGRID_EMAIL, // Change to your recipient
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: "New message from Capstone",
      text: `${toEmail.email} has sent the following message ${toEmail.message}`,
    };
    sgMail.send(msg);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

export default router;
