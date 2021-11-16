/**
 * @author Nic Ballesteros
 * @description This file handles a change in password.
 */

import { React, Component } from 'react'
import { http } from '../store';
import { withRouter } from 'react-router-dom';

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      password: "",
      retypePassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    console.log(value);

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
    console.log(this.props.match.params);

    //const { email, password } = this.state;
    if (this.state.password !== this.state.retypePassword) {
      //throw new Error('Passwords are not the same.');
      console.error(`Passwords must match.`);
    }

    if (this.state.password.length < 8) {
      // throw new Error('Password must be longer than 8 characters.');
      console.error(`Password length should be greater than 8.`);
    }

    if (!this.props.match.params.hash) {
      let res = await http.post('/api/user/reset', {
        password: this.state.password,
      });
    } else {
      let res = await http.post(`/api/user/reset/${this.props.match.params.hash}`, {
        password: this.state.password,
      });
    }
  }

  render() {
    return (
    <div className="basic-container" style={{ marginLeft: '20vmin', marginRight: '20vmin'}}>
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
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
                  placeholder="Enter a new password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="formField">
              <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="retype-password">
                Retype Password
              </label>
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                id="retype-password"
                className="formFieldInput"
                placeholder="Retype your password"
                name="retypePassword"
                value={this.state.retypePassword}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="formField">
            <button className="formFieldButton">Reset Password</button>{" "}
          </div>
        </form>
      </div>
    </div>);
  }
}

export default withRouter(ResetPassword);