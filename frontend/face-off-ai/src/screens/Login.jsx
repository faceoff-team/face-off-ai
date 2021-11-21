import { React, Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux'; 
import { login } from '../actions/authActions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
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

  async handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);

    const { email, password } = this.state;

    await this.props.login(email, password);

    if (this.props.isAuthenticated) {
      this.props.history.push('/profile');
    }
  }



responseFacebook(response) {
    console.log(response);
        const authResponse = new Promise(window.FB.login);
        if (!authResponse) {
            this.props.history.push('/profile');
        }
        
        /*setData(response);
        setPicture(response.picture.data.url);*/
        if (response.accessToken) {
            /*setLogin(true);*/
        } else {
            /*setLogin(false);*/
        }
}

  render() {

    return (
    <div class="basic-container" style={{ marginLeft: '20vmin', marginRight: '20vmin'}}>
        <div className="formCenter">
            <form className="formFields" onSubmit={this.handleSubmit}>
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
                <button className="formFieldButton">Sign In</button>{" "}
                <div>
                  <Link to="/forgot" className="formFieldLink">
                    Forgot my password
                  </Link>
                </div>
                <div>
                  <Link to="/register" className="formFieldLink">
                    Create an account
                  </Link>
                </div>
            </div>

            <div className="socialMediaButtons">
              <FacebookLogin
                appId="372920357955526"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={() => this.responseFacebook.bind(this)}
                icon="fa-facebook" />
            </div>
            </form>
        </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const LoginWithRouter = withRouter(Login);

export default connect(
  mapStateToProps,
  { login } 
)(LoginWithRouter);