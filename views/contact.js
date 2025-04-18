import html from "html-literal";

export default state => html`
  <section class="contact-us">
    <h1>Contact Us</h1>
    <p>
      Have questions and/or suggestions? Leave a message here.
    </p>
    <form>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows="5" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
`;
