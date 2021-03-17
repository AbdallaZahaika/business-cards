import userService from "../../services/userService";
import { Route, Redirect } from "react-router-dom";
//// this ProtectedRoute Protection pages jus user can see the pages
const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const currentUser = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: "/signin",
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
