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
      <form className="wrapper flow flow--lg bg-100 pad-lg br-400" onSubmit={handleSubmit} noValidate>
        {formSubmit && (
          <div className="toast flow flow--sm pad-lg br-200" aria-role="alert">
            <span className="flex-flow align-center fs-md fw-bold">
              <img src="../src/assets/images/icon-success-check.svg" alt="" />
              Message sent!
            </span>
            <p className="clr-primary-200">Thanks for completing the form. We'll be in touch soon!</p>
          </div>
        )}

        <h1 className="fs-lg">Contact Us</h1>

        <div className="flow flow--lg grid-2-col">
          <FormGroup isValid={error.fName} errorMsg="This field is required">
            <label htmlFor="fName">First Name</label>
            <input type="text" name="fName" id="fName" required onBlur={checkError} onChange={clearError} />
          </FormGroup>

          <FormGroup isValid={error.lName} errorMsg="This field is required">
            <label htmlFor="lName">Last Name</label>
            <input type="text" name="lName" id="lName" required onBlur={checkError} onChange={clearError} />
          </FormGroup>
        </div>

        <FormGroup isValid={error.email} errorMsg="Please enter a valid email">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required onBlur={checkError} onChange={clearError} />
        </FormGroup>

        <fieldset className="flow">
          <legend>Query Type</legend>
          <FormGroup className="grid-flow grid-2-col" isValid={error.queryType} errorMsg="Please select a query">
            <label className="radio-group span-1 fs-md" htmlFor="generalEnquiry">
              <input type="radio" name="queryType" id="generalEnquiry" value="general" required onChange={clearError} />
              General Enquiry
            </label>

            <label className="radio-group fs-md" htmlFor="supportRequest">
              <input type="radio" name="queryType" id="supportRequest" value="support" required onChange={clearError} />
              <span>Support Request</span>
            </label>
          </FormGroup>
        </fieldset>

        <FormGroup isValid={error.message} errorMsg="This field is required">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows={8} required onBlur={checkError} onChange={clearError}></textarea>
        </FormGroup>

        <FormGroup className="flow--2xl " isValid={error.consent} errorMsg="To submit this form, please consent to being contacted">
          <div>
            <label className="flex-flow align-center gap-sm" htmlFor="consent">
              <input type="checkbox" name="consent" id="consent" required onChange={clearError} />
              <span>I consent to being contacted by the team</span>
            </label>
          </div>
        </FormGroup>

        <button className="button flow--2xl " type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default ContactUsForm;
