import { useState } from "react";
import useInput from "../hooks/useInput";
import { isNotEmpty, isEmail, isValidPhone } from "../util/validation";
import classes from "./ContactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput("", isNotEmpty);

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChnage,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
  } = useInput("", isValidPhone);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", isEmail);

  // Form is valid if name is filled AND (email is valid OR phone is valid)
  const isFormValid =
    isNotEmpty(nameValue) && (isEmail(emailValue) || isValidPhone(phoneValue));

  function handleSubmit(event) {
    event.preventDefault();

    const nameIsInvalid = !isNotEmpty(nameValue);
    const emailIsInvalid = !isEmail(emailValue);
    const phoneIsInvalid = !isValidPhone(phoneValue);

    // At least name and one contact method must be valid
    if (nameIsInvalid || (emailIsInvalid && phoneIsInvalid)) {
      return;
    }

    setSubmitted(true);
    console.log({
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    });
  }

  if (submitted) {
    return (
      <div id="contact" className={classes.submitMessage}>
        <h2>Thanks for cantacting us!</h2>
        <p>We will get back to you soon...</p>
      </div>
    );
  }

  return (
    <form id="contact" className={classes.form} onSubmit={handleSubmit}>
      <h2>Contact me</h2>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={nameValue}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        {nameHasError && (
          <p className={classes.error}>Please enter your name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="phone">Phone</label>
        <div className={classes.controlRow}>
          <select name="phone" id="phone">
            <option value="050">050</option>
            <option value="052">052</option>
            <option value="053">053</option>
            <option value="054">054</option>
          </select>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phoneValue}
            onChange={handlePhoneChnage}
            onBlur={handlePhoneBlur}
            placeholder="1234567"
          />
        </div>
        {phoneHasError && (
          <p className={classes.error}>Please enter a valid phone number</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {emailHasError && (
          <p className={classes.error}>Please enter a valid email</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="message">Message</label>
        <textarea name="message" rows={5} placeholder="Your message" />
      </div>

      <p className={classes.formActions}>
        <button disabled={!isFormValid}>Submit</button>
      </p>
    </form>
  );
}
