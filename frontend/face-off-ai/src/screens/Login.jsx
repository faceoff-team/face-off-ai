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
    <div class="basic-container" style={{marginRight: "25em", marginLeft: "25em"}}>
        <h2 class="font-weight-heavy">Sign in</h2>
        <p style={{ color: "#cbcbcb"}}>Please enter your details to continue.</p>
        <div className="formCenter">
            <form className="formFields" onSubmit={this.handleSubmit}>
               
                <label className="formFieldLabel" htmlFor="email">
                    E-Mail Address
                </label>                
                <input
                    type="email"
                    id="email"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Enter your email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />

                
                <label className="formFieldLabel" htmlFor="password" 
                    style={{
                        marginTop: "0.75em"
                    }}>
                    Password
                </label>
                
                <input
                    type="password"
                    id="password"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <br /><br />

            <div className="formField">
                <button className="formFieldButton"
                style={{ backgroundColor: "#4CC0AD"}}>Sign In</button>{" "}
                <br /><br />
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