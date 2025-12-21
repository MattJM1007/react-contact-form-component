function FormGroup({ children, isValid, errorMsg }) {
  return (
    <div className="form-group">
      {children}
      <span className="error" aria-live="polite">
        {isValid && errorMsg}
      </span>
    </div>
  );
}

export default FormGroup;
