import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import cardsService from "../services/cardsService";
import SearchBar from "./common/searchbar";
import PublicCard from "./common/PublicCard";
import userService from "../services/userService";
import { search } from "../services/cardsService";
import Pagination from "./common/pagination";
class AllCards extends Component {
  state = {
    cards: [],
    favoritedCards: [],
    pageNumber: 0,
    pages: 0,
  };
  componentDidMount() {
    this.setDataFromServer();
    this.getFavortCards();
    this.countCards();
  }
  /// this function get all cards from db and set them in the state
  async setDataFromServer() {
    const { data } = await cardsService.getAll();
    this.setState({ cards: data });
  }
  /// count of cards
  async countCards() {
    const { data } = await cardsService.countAllCards();
    if (data.length) {
      this.setState({ pages: data[0].user_id });
    }
  }

  async getFavortCards() {
    const { cards } = await userService.getUserInfo();
    this.setState({ favoritedCards: cards });
  }

  /// handle Pages
  handlePages = async (pageNum) => {
    const { data } = await cardsService.getAll(pageNum - 1);
    this.setState({ cards: data });
    this.setState({ pageNumber: pageNum });
  };

  /// this function handleSearch
  handleSearch = async (value) => {
    if (!value) {
      return this.setDataFromServer();
    }

    const { data } = await search(value);
    if (data) {
      return this.setState({ cards: [data] });
    }
    return this.setState({ cards: [] });
  };

  render() {
    const { cards, favoritedCards, pages } = this.state;
    const numberPages = Math.ceil(pages / 9);
    const paginate = (pageNum) => this.handlePages(pageNum);
    if (!userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container ">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="row ">
            <div className="col-12">
              <PageHeader titleText="All Cards" />
              <p>All Cards are in the list below</p>
            </div>
          </div>
          <div className="my-5">
            <SearchBar searchValue={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <PublicCard
                key={card.cardNumber}
                card={card}
                myFavoriteCards={favoritedCards}
              />
            ))
          ) : (
            <div className="col-12 text-muted">No cards...</div>
          )}
        </div>
        {cards.length > 9 && (
          <Pagination paginate={paginate} numberPages={numberPages} />
        )}
      </div>
    );
  }
}

export default AllCards;
