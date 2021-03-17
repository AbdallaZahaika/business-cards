const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  cardDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  cardAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  cardPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  cardImage: {
    type: Object,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  biz: Boolean,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    cardName: Joi.string().min(2).max(255).required(),
    cardDescription: Joi.string().min(2).max(1024).required(),
    cardAddress: Joi.string().min(2).max(400).required(),
    cardPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    cardImage: Joi.object(),
  });

  return schema.validate(card);
}
//// this  function  give card random Number
async function generateCardNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ cardNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generateCardNumber = generateCardNumber;
