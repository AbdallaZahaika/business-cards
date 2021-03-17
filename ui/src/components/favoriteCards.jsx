import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import PublicCard from "./common/PublicCard";
import userService from "../services/userService";
class FavoriteCards extends Component {
  state = {
    cards: [],
    favoritedCards: [],
  };

  componentDidMount() {
    this.setDataFromServer();
  }
  //// this function get all cards user has favorite
  setDataFromServer = async () => {
    const { cards } = await userService.getUserInfo();
    this.setState({ favoritedCards: cards });
    const cardsNumbres = cards.toString();
    if (cardsNumbres) {
      const { data } = await userService.allFavorite(cardsNumbres);
      this.setState({ cards: data });
    } else {
      this.setState({ cards: [] });
    }
  };
  render() {
    const { cards, favoritedCards } = this.state;
    return (
      <div className="container ">
        <div className="container d-flex justify-content-between">
          <div className="row ">
            <div className="col-12">
              <PageHeader titleText="Favorite Cards" />
              <p>All Cards you favorite are in the list below</p>
            </div>
          </div>
        </div>

        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <PublicCard
                unfavorite={this.setDataFromServer}
                key={card._id}
                card={card}
                myFavoriteCards={favoritedCards}
              />
            ))
          ) : (
            <div className="col-12 text-muted">No cards...</div>
          )}
        </div>
      </div>
    );
  }
}

export default FavoriteCards;
