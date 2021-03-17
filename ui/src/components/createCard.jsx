import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import cardService from "../services/cardsService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "./common/input";
class CreateCard extends Form {
  state = {
    data: {
      cardName: "",
      cardDescription: "",
      cardAddress: "",
      cardPhone: "",
      cardImage: "",
    },
    image: {},
    errors: {},
  };
  fileChange = (e) => {
    this.setState({
      data: { ...this.state.data, cardImage: e.target.files[0] },
    });
  };

  async doSubmit() {
    const { cardImage, ...data } = this.state.data;
    if (cardImage) {
      let formData = new FormData();
      formData.append("image", cardImage);
      const response = await cardService.uploadCardImage(formData);
      if (response.data.error) {
        this.setState({ errors: { cardImage: response.data.error } });
        return;
      }
      data.cardImage = response.data;
    }

    await cardService.createCard(data);
    toast("A new card is opened");
    this.props.history.replace("/my-cards");
  }

  schema = {
    cardName: Joi.string().min(2).max(255).required().label("Business Name"),
    cardDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Business Description"),
    cardAddress: Joi.string()
      .min(2)
      .max(400)
      .required()
      .label("Business Address"),
    cardPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Business Phone"),
    cardImage: Joi.any(),
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Business registration form" />
        <div className="row">
          <div className="col-12">
            <p>Open a business card</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("cardName", "Business Name")}
              {this.renderInput("cardDescription", "Business Description")}
              {this.renderInput("cardAddress", "Business Address")}
              {this.renderInput("cardPhone", "Business Phone", "number")}
              <Input
                type="file"
                label="iamge"
                name="cardImage"
                onChange={this.fileChange}
                error={errors["cardImage"]}
              />
              {this.renderButton("Create Card")}
              <Link className="ml-4 btn btn-danger" to="/my-cards">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
