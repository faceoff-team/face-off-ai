import { React, Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
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

  async handleSubmit(event) {
    event.preventDefault();

    if (this.password !== this.retypepassword) {
      console.log("Passwords do not match.");
      return;
    }

    //let history = useHistory();

    const { email, password, username } = this.state;

    await this.props.register(username, password, email);

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
                <button className="formFieldButton">Register</button>
                <br />
                <Link to="/login" className="formFieldLink">
                Already have an account? Login
                </Link>
            </div>

            <div className="socialMediaButtons">
                <FacebookLogin
                    appId="372920357955526"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={this.responseFacebook.bind(this)}
                    icon="fa-facebook" />
            </div>
            </form>
        </div>
        </div>
    );
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const RegisterWithRouter = withRouter(Register);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { register } 
)(RegisterWithRouter);