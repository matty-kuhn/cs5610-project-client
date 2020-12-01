import React from "react";
import { getSessionUser, getUser } from "../../services/userService";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "" },
    };
  }

  componentDidMount() {
    if (this.props.username) {
      getUser(this.props.username)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("No such user exists");
          } else {
            return response.json();
          }
        })
        .then((user) => this.setState({ user: user }))
        .catch((error) => alert(error));
    } else {
      getSessionUser()
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("login first");
          } else {
            return response.json();
          }
        })
        .then((user) => this.setState({ user: user }))
        .catch((error) => alert(error));
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <h1 className="d-flex justify-content-center">Profile</h1>
          <h1 className="d-flex justify-content-center">
            {this.state.user.username}
          </h1>
          <h3 className="d-flex justify-content-center">
            Role: {this.state.user.role}
          </h3>
        </div>
      </div>
    );
  }
}
