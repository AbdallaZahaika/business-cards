import React, { Component } from "react";
class SearchBar extends Component {
  state = {
    value: "",
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  /// this function handle the value and send to parint the value form state
  handleSearch = () => {
    const { searchValue } = this.props;
    const { value } = this.state;
    searchValue(value.trim());
  };
  render() {
    const { value } = this.state;

    return (
      <form className="input-group  shadow">
        <input
          type="search"
          className="form-control rounded"
          placeholder="phone,cardNumber "
          aria-label="Search"
          aria-describedby="search-addon"
          value={value}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.handleSearch}
        >
          search
        </button>
      </form>
    );
  }
}

export default SearchBar;
