import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/userService";

const Navbar = ({ user }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    /// this function takes user info and sets it in the userInfo
    async function takeuserInfo() {
      if (user === true) {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
      }
    }
    takeuserInfo();
  }, [user]);
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Card <i className="far fa-id-card"></i> App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink to="/my-cards" className="nav-link">
                  My Cards
                </NavLink>
              </li>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <NavLink to="/all-cards" className="nav-link">
                    Cards
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/favoriteCards" className="nav-link">
                    Favorite Cards
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/biz-signup" className="nav-link">
                    Business Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item dropdown show">
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInfo.name}
                  {userInfo.biz && "(Business)"}
                </button>
                <div className="dropdown-menu ">
                  <NavLink to="/logout" className="dropdown-item">
                    Sign out <i className="fas fa-sign-out-alt ml-2"></i>
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

/// this function get the user state
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Navbar);
