import React from "react";
import "../styles/contactUs.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form has been submitted");

    const formData = new FormData(e.target);
    const formDetails = {};
    formData.forEach((value, key) => {
      formDetails[key] = value;
    });

    console.log(formDetails);
  };

  return (
    <div className="contact-us-wrapper">
      <section className="formcarry-container">
        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="formcarry-block">
            <label htmlFor="fc-generated-1-name">Full Name</label>
            <input
              type="text"
              name="name"
              id="fc-generated-1-name"
              placeholder="Your first and last name"
            />
          </div>

          <div className="formcarry-block">
            <label htmlFor="fc-generated-1-email">Your Email Address</label>
            <input
              type="email"
              name="email"
              id="fc-generated-1-email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="formcarry-block">
            <label htmlFor="fc-generated-1-message">Your message</label>
            <textarea
              name="message"
              id="fc-generated-1-message"
              placeholder="Enter your message..."
            ></textarea>
          </div>

          <div className="formcarry-block">
            <button type="submit">Send</button>
          </div>

          <div className="checkbox-wrapper">
            <p className="checkbox-label">
              Subscribe to our Newsletter
            </p>
            <input type="checkbox" name="newsletter" className="newsletter" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
