import PageHeader from "./common/pageHeader";
import cardsService from "../services/cardsService";
import Card from "./common/card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "./common/searchbar";
import { Component } from "react";
import { searchInMyCards } from "../services/cardsService";
import Pagination from "./common/pagination";
class MyCards extends Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    this.setDataFromServer();
    this.countCards();
  }
  /// this function get all user cards
  async setDataFromServer() {
    const { data } = await cardsService.getAllMyCards();
    this.setState({ cards: data });
  }
  /// count of my cards
  async countCards() {
    const { data } = await cardsService.countMyCards();
    if (data.length) {
      this.setState({ pages: data[0].user_id });
    }
  }
  /// handle Pages
  handlePages = async (pageNum) => {
    const { data } = await cardsService.getAllMyCards(pageNum - 1);
    this.setState({ cards: data });
    this.setState({ pageNumber: pageNum });
  };

  /// this function handle delete card
  handleDelete = async (id, image) => {
    if (window.confirm("you want to delete the card")) {
      await cardsService.deleteCardImage(image);
      await cardsService.deleteCard(id);
      toast("Card is deleted");
      this.setDataFromServer();
    }
    return;
  };
  /// this function handle Search
  handleSearch = async (value) => {
    if (!value) {
      return this.setDataFromServer();
    }
    const { data } = await searchInMyCards(value);
    if (data) {
      return this.setState({ cards: [data] });
    }
    return this.setState({ cards: [] });
  };
  render() {
    const { cards, pages } = this.state;
    const numberPages = Math.ceil(pages / 9);
    const paginate = (pageNum) => this.handlePages(pageNum);
    return (
      <div className="container">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="row">
            <PageHeader titleText="My Cards Page" />
            <div className="col-6">
              <p>Your cards are in the list below</p>
              <p>
                <Link className="btn btn-primary" to="/create-card">
                  Create a New Card
                </Link>
              </p>
            </div>
          </div>
          <div className="my-5">
            <SearchBar searchValue={this.handleSearch} />
          </div>
        </div>

        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDelete={() => this.handleDelete(card._id, card.cardImage)}
              />
            ))
          ) : (
            <div className="col-12 text-muted">No cards, create a card...</div>
          )}
        </div>
        {cards.length > 9 && (
          <Pagination paginate={paginate} numberPages={numberPages} />
        )}
      </div>
    );
  }
}

export default MyCards;
