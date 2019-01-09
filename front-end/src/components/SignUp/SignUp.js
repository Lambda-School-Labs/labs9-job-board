import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="sign-up-container">
        <form className="sign-up-form">
          <label className="form-label">
            Email:
            <input
              type="text"
              name="email"
              className="form-input"
              onChange={this.changeHandler}
              placeholder="Email"
              value={this.state.email}
              autoComplete="on"
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              className="form-input"
              onChange={this.changeHandler}
              placeholder="Password"
              value={this.state.password}
              autoComplete="off"
            />
          </label>
        </form>
        <button className="form-button">Sign Up</button>
      </div>
    );
  }
}

export default SignUp;
