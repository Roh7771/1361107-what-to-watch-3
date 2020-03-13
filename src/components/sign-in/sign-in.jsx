import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    const {onLoginFormSubmit} = this.props;

    e.preventDefault();

    onLoginFormSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {isFormSending, formErrorMessage, children} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        {formErrorMessage ? (
          <p style={{textAlign: `center`}}>
            Не удалось авторизоваться :( <br/>
            {`Причина: ${formErrorMessage}`}
          </p>
        ) : null}

        <div className="sign-in user-page__content">
          <form onSubmit={this._handleSubmit} action="#" className="sign-in__form">
            <fieldset style={{padding: 0, border: `none`}} disabled={isFormSending}>
              <div className="sign-in__fields">
                <div className="sign-in__field">
                  <input ref={this.loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input ref={this.passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </fieldset>
          </form>
        </div>

        {children}
      </div>
    );
  }
}

SignIn.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  formErrorMessage: PropTypes.string,
  isFormSending: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default SignIn;
