export default function LoginForm({
  name,
  title,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" name={name} onSubmit={onSubmit}>
        {children}
        <button className="login__btn" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
