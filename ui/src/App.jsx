import { Route, Switch } from "react-router-dom";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import { Component } from "react";
import Logout from "./components/logout";
import BizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import AllCards from "./components/allCards";
import EditCard from "./components/editCard";
import FavoriteCards from "./components/favoriteCards";
import { Provider } from "react-redux";
import store from "./store/store";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="d-flex flex-column min-vh-100">
          <ToastContainer />
          <header>
            <Navbar />
          </header>
          <main className="container-fluid flex-fill">
            <Switch>
              <ProtectedRoute path="/my-cards/edit/:id" component={EditCard} />
              <ProtectedRoute path="/my-cards" component={MyCards} />
              <ProtectedRoute path="/create-card" component={CreateCard} />
              <ProtectedRoute path="/favoriteCards" component={FavoriteCards} />
              <ProtectedRoute path="/all-cards" component={AllCards} />
              <Route path="/biz-signup" component={BizSignup} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/logout" component={Logout} />
              <Route path="/about" component={About} />
              <Route path="/" component={Home} exact />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
