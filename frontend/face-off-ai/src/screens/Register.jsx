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

  render() {
    return (
        <div class="basic-container" style={{ marginLeft: '20vmin', marginRight: '20vmin'}}>
        <h2 class="font-weight-heavy">Sign Up</h2>
        <p style={{ color: "#cbcbcb"}}>Please enter your details to continue.</p>
        <div className="formCenter">
            <form className="formFields" onSubmit={this.handleSubmit}>
            <div className="formField">
                <div className="labelWrapper">
                <label className="formFieldLabel" htmlFor="username">
                    Username
                </label>
                </div>

                <input
                    type="text"
                    id="username"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Enter A New Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
            </div>
            
            <div className="formField">
                <div className="labelWrapper">
                <label className="formFieldLabel" htmlFor="email">
                    E-Mail Address
                </label>
                </div>
                
                <input
                    type="email"
                    id="email"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Enter your email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
            </div>

            <div className="formField">
                <div className="labelWrapper">
                <label className="formFieldLabel" htmlFor="password">
                    Password
                </label>
                </div>
                
                <input
                    type="password"
                    id="password"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                
            </div>

            <div className="formField">
                <div className="labelWrapper">
                <label className="formFieldLabel" htmlFor="password">
                    Retype Password
                </label>
                </div>
                
                <input
                    type="password"
                    id="retypepassword"
                    className="rounded-lg w-full border border-gray-400 p-2 mb-1"
                    placeholder="Retype your password"
                    name="retypepassword"
                    value={this.state.retypepassword}
                    onChange={this.handleChange}
                />
                
            </div>

            <div className="formField">
                <button className="formFieldButton">Register</button>
                <br /><br />
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