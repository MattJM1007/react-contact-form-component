import { useState } from "react";
import FormGroup from "./FormGroup";

function ContactUsForm() {
  const [error, setError] = useState({
    fName: false,
    lName: false,
    email: false,
    queryType: false,
    message: false,
    consent: false,
  });

  const [formSubmit, setFormSubmit] = useState(false);

  function checkError(e) {
    const { name } = e.target;
    const inputValid = e.target.checkValidity();

    setError((prev) => {
      return { ...prev, [name]: !inputValid };
    });
  }

  function clearError(e) {
    const { name } = e.target;
    setError((prev) => {
      return { ...prev, [name]: false };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    //prettier-ignore
    const newErrors = [...e.target.elements]
      .filter((el) => el.name && el.type !== "submit")
      .reduce((acc, el) => ({ ...acc, [el.name]: !el.checkValidity() }), {});

    setError(newErrors);

    const hasErrors = Object.values(newErrors).includes(true);

    if (!hasErrors) {
      console.log("success!");
      e.target.reset();
      setFormSubmit(true);
      setInterval(() => {
        setFormSubmit(false);
      }, 5000);
    }
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit} noValidate>
        {formSubmit && (
          <div className="toast" aria-role="alert">
            <span>
              <img src="../src/assets/images/icon-success-check.svg" alt="" />
              Message sent!
            </span>
            <p>Thanks for completing the form. We'll be in touch soon!</p>
          </div>
        )}

        <h1 className="form-title">Contact Us</h1>

        <FormGroup isValid={error.fName} errorMsg="This field is required">
          <label htmlFor="fName">First Name</label>
          <input type="text" name="fName" id="fName" required onBlur={checkError} onChange={clearError} />
        </FormGroup>

        <FormGroup isValid={error.lName} errorMsg="This field is required">
          <label htmlFor="lName">Last Name</label>
          <input type="text" name="lName" id="lName" required onBlur={checkError} onChange={clearError} />
        </FormGroup>

        <FormGroup isValid={error.email} errorMsg="Please enter a valid email">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required onBlur={checkError} onChange={clearError} />
        </FormGroup>

        <fieldset>
          <legend>Query Type</legend>
          <FormGroup isValid={error.queryType} errorMsg="Please select a query">
            <div className="radio-group">
              <input type="radio" name="queryType" id="generalEnquiry" value="general" required onChange={clearError} />
              <label htmlFor="generalEnquiry">General Enquiry</label>
            </div>

            <div className="radio-group">
              <input type="radio" name="queryType" id="supportRequest" value="support" required onChange={clearError} />
              <label htmlFor="supportRequest">Support Request</label>
            </div>
          </FormGroup>
        </fieldset>

        <FormGroup isValid={error.message} errorMsg="This field is required">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows={3} required onBlur={checkError} onChange={clearError}></textarea>
        </FormGroup>

        <FormGroup isValid={error.consent} errorMsg="To submit this form, please consent to being contacted">
          <input type="checkbox" name="consent" id="consent" required onChange={clearError} />
          <label htmlFor="consent">I consent to being contacted by the team</label>
        </FormGroup>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ContactUsForm;
