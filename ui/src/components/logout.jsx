import { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../store/user/userActions";
import userService from "../services/userService";
class Logout extends Component {
  state = {};

  componentDidMount() {
    this.props.setUser(null);

    userService.logout();
    this.props.history.replace("/");
  }

  render() {
    return null;
  }
}

/// this function get the user state
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

/// this function change the  user state
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
