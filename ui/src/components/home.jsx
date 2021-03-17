const Home = () => {
  return (
    <main role="main">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">
            Welcome to Card <i className="far fa-id-card"></i> App
          </h1>
          <p>
            here you can found the best Business card and you can open a
            Business card for free the best card design
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>card design</h2>
            <div className="col-md-6 col-lg-4 mt-3 mb-5">
              <div className="card shadow" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  height="175px"
                  src="https://cdn.computercareers.org/wp-content/uploads/Become-a-Web-Developer.jpg"
                  alt="me"
                />
                <div className="card-body">
                  <h5 className="card-title">Name: abdalla </h5>
                  <p className="card-text">Description: Junior Web Developer</p>
                  <address className="card-text">Address: Jerusalem</address>
                  <p className="card-text">Phone: 0528169853</p>
                  <p>Favorites: 70</p>
                  <div className="d-flex justify-content-center w-100">
                    <span className={"btn text-primary"}>favorite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <h2>the quality</h2>
            <p>here you will found the best business cards for free</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
