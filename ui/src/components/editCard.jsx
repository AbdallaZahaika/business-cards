import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import cardService from "../services/cardsService";
import Input from "./common/input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class EditCard extends Form {
  state = {
    data: {
      cardName: "",
      cardDescription: "",
      cardAddress: "",
      cardPhone: "",
      cardImage: "",
    },
    oldImage: {},
    errors: {},
  };

  fileChange = (e) => {
    this.setState({
      data: { ...this.state.data, cardImage: e.target.files[0] },
    });
  };

  async componentDidMount() {
    const { data } = await cardService.getCard(this.props.match.params.id);
    this.setState({ oldImage: data.cardImage });
    this.setState({ data: this.mapDataToState(data) });
  }

  mapDataToState({ _id, cardName, cardDescription, cardAddress, cardPhone }) {
    return {
      _id,
      cardName,
      cardDescription,
      cardAddress,
      cardPhone,
    };
  }

  async doSubmit() {
    const { data, oldImage } = this.state;
    if (data.cardImage.size) {
      let formData = new FormData();
      formData.append("image", data.cardImage);
      const response = await cardService.uploadCardImage(formData);

      if (response.data.error) {
        this.setState({ errors: { cardImage: response.data.error } });
        return;
      }
      data.cardImage = response.data;
      await cardService.deleteCardImage(oldImage);
    }
    await cardService.updateCard(data);
    toast("Card is updated");
    this.props.history.push("/my-cards");
  }

  schema = {
    _id: Joi.string(),
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
        <PageHeader titleText="Edit card" />
        <div className="row ">
          <div className="col-lg-6"></div>
        </div>
        <div className="row">
          <div className="col-lg-6 ">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("cardName", "Business Name")}
              {this.renderInput("cardDescription", "Business Description")}
              {this.renderInput("cardAddress", "Business Address")}
              {this.renderInput("cardPhone", "Business Phone")}
              <Input
                type="file"
                label="iamge"
                name="cardImage"
                onChange={this.fileChange}
                error={errors["cardImage"]}
              />
              {this.renderButton("Update Card")}
              <Link className="ml-4 btn btn-danger" to="..">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
