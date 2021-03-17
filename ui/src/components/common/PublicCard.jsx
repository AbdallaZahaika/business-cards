import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { serverUrl } from "../../services/serverUrl.json";
const PublicCard = ({
  card: {
    cardName,
    cardDescription,
    cardAddress,
    cardPhone,
    cardImage,
    cardNumber,
    biz,
    favorites,
  },
  unfavorite,
  myFavoriteCards,
}) => {
  const [favorite, setFavorite] = useState(false);
  //// this state handle the number of favorites card when user add  the card to favorite change a number of favorites in card
  const [favoritesNumber, setFavoritesNumber] = useState(favorites);
  useEffect(() => {
    myFavoriteCards.filter((item) => {
      if (item === cardNumber) {
        return setFavorite(true);
      }
      return item;
    });
  });
  //// this function handle add  card and remove card from  Favorite
  const handleFavorite = async () => {
    if (!favorite) {
      await userService.favorite(cardNumber);
      setFavoritesNumber((previous) => previous + 1);
      toast.warn(`you favorite ${cardName} `);
      setFavorite(true);
    } else {
      await userService.unFavorite(cardNumber);
      setFavoritesNumber((previous) => previous - 1);
      toast.error(`you unfavorite ${cardName} `);
      setFavorite(false);
      if (unfavorite) {
        unfavorite();
      }
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mt-3 mb-5">
      <div className="card shadow" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          height="175px"
          src={`${serverUrl}${cardImage.file.path}`}
          alt={cardName}
        />
        <div className="card-body">
          {biz && <p>(Company)</p>}
          <h5 className="card-title">Name: {cardName}</h5>
          <p className="card-text">Description: {cardDescription}</p>
          <address className="card-text">Address: {cardAddress}</address>
          <p className="card-text">
            <a href={"tel:" + cardPhone}>Phone: {cardPhone}</a>
          </p>
          <p>likes: {favoritesNumber}</p>
          <div className="d-flex justify-content-center w-100">
            <button
              className={!favorite ? "btn btn-primary" : "btn btn-warning"}
              onClick={handleFavorite}
            >
              <span>{!favorite ? "favorite" : "favored"}</span>
              <i
                className={
                  !favorite ? "far fa-star fa-lg" : "fas fa-star fa-lg"
                }
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCard;
