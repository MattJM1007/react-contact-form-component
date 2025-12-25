function FormGroup({ children, className, isValid, errorMsg, inputId }) {
  const errorId = `${inputId}-error`;

  return (
    <div className={`form-group ${className || ""}`}>
      {children}
      <span id={errorId} className="error" aria-live="polite">
        {isValid && errorMsg}
      </span>
    </div>
  );
}

export default FormGroup;
