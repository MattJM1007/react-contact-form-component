function FormGroup({ children, className, isValid, errorMsg }) {
  return (
    <div className={"form-group " + className}>
      {children}
      <span className="error" aria-live="polite">
        {isValid && errorMsg}
      </span>
    </div>
  );
}

export default FormGroup;
