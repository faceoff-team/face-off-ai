import { React, Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'; 
import { register } from '../actions/authActions';
import store from '../store';

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
        const username = store.getState().auth.user.username;
        this.props.history.push(`/profile/${username}`);
    }

  }

  render() {
    return (
        <div className="content-center" class="basic-container"
            style={{marginRight: "max(20px, 25%)", marginLeft: "max(20px, 25%)"}}>
            <h2 class="font-weight-heavy">Sign Up</h2>
            <p style={{ color: "#cbcbcb"}}>Please enter your details to continue.</p>
            <div className="formCenter">
                <form className="formFields" onSubmit={this.handleSubmit}>
                    <label className="formFieldLabel" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="rounded-lg border border-gray-400 p-2 mb-1"
                        placeholder="Enter A New Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label className="formFieldLabel" htmlFor="email" style={{
                        marginTop: "0.75em"
                    }}>
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="rounded-lg border border-gray-400 p-2 mb-1"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label className="formFieldLabel" htmlFor="password" style={{
                        marginTop: "0.75em"
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="rounded-lg border border-gray-400 p-2 mb-1"
                        placeholder="Enter your password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <label className="formFieldLabel" htmlFor="password" style={{
                        marginTop: "0.75em"
                    }}>
                        Retype Password
                    </label>
                    <input
                        type="password"
                        id="retypepassword"
                        className="rounded-lg border border-gray-400 p-2 mb-1"
                        placeholder="Retype your password"
                        name="retypepassword"
                        value={this.state.retypepassword}
                        onChange={this.handleChange}
                    />
                <br /><br />
                <div className="formField">
                    <button className="formFieldButton" 
                        style={{ backgroundColor: "#4CC0AD"}}>Register</button>
                    <br /><br />
                    <Link to="/login" className="formFieldLink">
                    Already have an account? Sign in
                    </Link>
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