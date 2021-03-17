import { Component } from "react";

class Pagination extends Component {
  render() {
    const { numberPages, paginate } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= numberPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map((num) => (
            <li className="page-item" key={num}>
              <button
                onClick={() => paginate(num)}
                className="btn btn-primary mr-2"
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
