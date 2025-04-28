import html from "html-literal";

export default state => html`
  <section class="contact-us">
    <h1>Contact Us</h1>
    <p>
      Have questions and/or suggestions? Leave a message here.
    </p>
    <form id="emailForm">
      <input id="to" type="text" placeholder="Your Name" required />
      <input id="do" type="email" placeholder="Your Email" required />
      <textarea
        id="message"
        name="message"
        placeholder="Your Message"
        rows="4"
        required
      ></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
`;
