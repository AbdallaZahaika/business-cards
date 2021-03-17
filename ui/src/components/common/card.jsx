import { Link } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl.json";
//// this  card for page mycards
const Card = ({
  card: {
    _id,
    cardName,
    cardDescription,
    cardAddress,
    cardPhone,
    cardImage,
    cardNumber,
    biz,
    favorites,
  },
  onDelete,
}) => {
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
          <address className="card-text">Address: {cardAddress}</address>
          <p className="card-text">
            <a href={"tel:" + cardPhone}>Phone: {cardPhone}</a>
          </p>
          <p>likes: {favorites}</p>
          <h6 className="mb-3">card Number: {cardNumber}</h6>
          <p className="card-text">Description: {cardDescription}</p>
          <Link to={`/my-cards/edit/${_id}`} className="btn btn-primary">
            Edit
          </Link>
          <button className="btn btn-danger ml-4" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
