import { React, Component } from 'react'
import { Link } from "react-router-dom";
import { FacebookLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import { connect } from 'react-redux'; 
import { register } from '../actions/authActions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      retypepassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.password !== this.retypepassword) {
      console.log("Passwords do not match.");
      return;
    }

    console.log("The form was submitted with the following data:");
    console.log(this.state);

    const { email, password, username } = this.state;

    this.props.register(username, password, email);
  }

  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
        <div className="formField">
            <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="username">
                Username
              </label>
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                id="username"
                className="formFieldInput"
                placeholder="Enter A New Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          
          <div className="formField">
            <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
            </div>
            <div className="inputWrapper">
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="formField">
            <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="formField">
            <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="password">
                Retype Password
              </label>
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                id="retypepassword"
                className="formFieldInput"
                placeholder="Retype your password"
                name="retypepassword"
                value={this.state.retypepassword}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="formField">
            <button className="formFieldButton">Register</button>{" "}
            <Link to="/login" className="formFieldLink">
              Already have an account? Login
            </Link>
          </div>

          <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { register } 
)(Register);