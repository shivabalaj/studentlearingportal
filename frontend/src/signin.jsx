import React, { useState } from "react";
import NavBar from "./Component/NavBar";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    tel: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone number to 10 digits
    if (name === "tel") {
      const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData({ ...formData, tel: digitsOnly });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", formData.username);
    console.log("Email:", formData.email);
    console.log("Phone:", formData.tel);
    console.log("Message:", formData.message);

    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({
      username: "",
      email: "",
      tel: "",
      message: "",
    });
  };

return (
    <>
      <NavBar />
      <h1>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="enter your name"
          value={formData.username}
          onChange={handleChange}
        />
        <br /><br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="tel"
          placeholder="phone"
          value={formData.tel}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Upload Resume:</label><br /><br />
        <input type="file" accept=".pdf,.doc,.docx" />
        <br /><br />

        <label>Message:</label><br /><br />
        <textarea
          name="message"
          rows="4"
          cols="50"
          placeholder="enter your message"
          value={formData.message}
          onChange={handleChange}
        />
        <br /><br />

        <input type="submit" value="Contact Us" />
      </form>

      <marquee>Note: For demonstration purposes.</marquee>
    </>
  );
};

export default Contact;