import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";
import { GET_ERRORS } from "../../reducers/types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./Auth.css";

function Register(props) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  const [errors,setErrors] = useState({});

  useEffect(() => {
    store.dispatch({
      type: GET_ERRORS,
      payload: {}
    })
  }, []);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  const onChangeName = e => {
    setName(e.target.value );
  };

  const onChangeEmail = e => {
    setEmail(e.target.value );
  };

  const onChangePassword= e => {
    setPassword(e.target.value );
  };

  const onChangePassword2= e => {
    setPassword2(e.target.value );
  };

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };

    props.registerUser(newUser, props.history);
  };

  return (
    <div className="center grey padding-top-register">
      <Link to="/" className="btn-flat waves-effect white-text">
        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
      <div className="col s12">
        <h4>
          <b className = "white-text">Register</b>
        </h4>
        <p className="grey-text text-darken-1">
          Already have an account? <Link to="/login" className="red-text">Log in</Link>
        </p>
      </div>
      <form noValidate onSubmit={onSubmit} className = "row">
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangeName}
            value={name}
            error={errors.name}
            id="name"
            type="text"
            className={classnames("white-text", {invalid: errors.name})}
          />
          <label htmlFor="name">Name</label>
          <span className="red-text">{errors.name}</span>
        </div>
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangeEmail}
            value={email}
            error={errors.email}
            id="email"
            type="email"
            className={classnames("white-text", {
              invalid: errors.email
            })}
          />
          <label htmlFor="email">Email</label>
          <span className="red-text">{errors.email}</span>
        </div>
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangePassword}
            value={password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("white-text", {
              invalid: errors.password
            })}
          />
          <label htmlFor="password">Password</label>
          <span className="red-text">{errors.password}</span>
        </div>
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangePassword2}
            value={password2}
            error={errors.password2}
            id="password2"
            type="password"
            className={classnames("white-text", {
              invalid: errors.password2
            })}
          />
          <label htmlFor="password2">Confirm Password</label>
          <span className="red-text">{errors.password2}</span>
        </div>
        <div className="col col s10 l4 offset-s1 offset-l4">
          <button
            type="submit"
            className="btn auth-button transparent redborder waves-effect waves-light hoverable "
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
    
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));