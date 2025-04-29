import { Router } from "express";
import sgMail from "@sendgrid/mail";

const router = Router();

// Create estimate route
router.post("/", async (request, response) => {
  console.log(request.body);
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.SENDGRID_EMAIL, // Change to your recipient
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: "New message from Capstone",
      text: `has sent the following message ${request.body.email}`,
    };
    await sgMail.send(msg);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

export default router;
