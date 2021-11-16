/**
 * @author Nic Ballesteros
 * @description This file handles a forgot my password request.
 * 11/16/21
 */

import { React, Component } from 'react'
import { http } from '../store';
import { withRouter } from 'react-router-dom';

class Forgot extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
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

    let res = await http.post('/api/user/forgotpassword', {
      user: this.state.user,
    });
  }

  render() {
    return (
      <div className="basic-container" style={{ marginLeft: '20vmin', marginRight: '20vmin'}}>
        <div className="formCenter">
          <form className="formFields" onSubmit={this.handleSubmit}>
            <div className="formField">
            <div className="labelWrapper">
              <label className="formFieldLabel" htmlFor="password">
                Username/Email
              </label>
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  id="user"
                  className="formFieldInput"
                  placeholder="Enter a username or password"
                  name="user"
                  value={this.state.user}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="formField">
              <button className="formFieldButton">Recover Account</button>{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Forgot);