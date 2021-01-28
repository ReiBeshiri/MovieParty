import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { initSocket } from "../../socket/socket";
import store from "../../store";
import { GET_ERRORS } from "../../reducers/types";
import "./Auth.css";
import {userBadgeList} from "../../actions/usersActions"

function Login(props) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors,setError] = useState({});

  useEffect(() => {
    store.dispatch({
      type: GET_ERRORS,
      payload: {}
    })
  }, []);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      userBadgeList(props.auth.user.name)
      initSocket(props.auth.user.name);
      props.history.push("/dashboard");
    }

    if (props.errors) {
      setError(props.errors);
    }
  }, [props.auth,props.errors, props.history])

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  useEffect(()=>{
    if(errors.passwordincorrect === "Password incorrect"){
      errors.passwordincorrect = ""
    }
  },[errors]);


  return (
    <div className="center grey padding-top-login">
      <Link to="/" className="btn-flat waves-effect white-text">
        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
      <div className="col s12">
        <h4>
          <b className = "white-text">Login</b>
        </h4>
        <p className="grey-text text-darken-1">
          Don't have an account? <Link to="/register" className = "red-text">Register</Link>
        </p>
      </div>
      <form noValidate onSubmit={onSubmit} className = "row">
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangeEmail}
            value={email}
            error={errors.email}
            id="email"
            type="email"
            className={classnames("white-text", {
              invalid: errors.email || errors.emailnotfound
            })}
          />
          <label htmlFor="email">Email</label>
          <span className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
        </div>
        <div className="input-field col s10 l4 offset-s1 offset-l4">
          <input
            onChange={onChangePassword}
            value={password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("white-text", {
              invalid: errors.password || errors.passwordincorrect
            })}
          />
          <label htmlFor="password">Password</label>
          <span className="red-text">
            {errors.password}
            {errors.passwordincorrect}
          </span>
        </div>
        <div className="col col s10 l4 offset-s1 offset-l4">
          <button
            type="submit"
            className="btn auth-button transparent redborder waves-effect waves-light hoverable"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  badges: state.badges
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);