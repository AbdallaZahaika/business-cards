const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ cardNumber: { $in: cardsArray } });
  return cards;
};

/// get all  user favorited Cards
router.get("/favoriteCards", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");
  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

//// to add favorite  card  in user.cards
router.patch("/favorite", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const data = await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: {
          cards: req.body.cards,
        },
      }
    );
    /// Increase the number of favorites in card
    await Card.updateOne(
      { cardNumber: req.body.cards[0] },
      { $inc: { favorites: +1 } }
    );

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

//// remove favorite  card  from  user.cards
router.patch("/unFavorite", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const data = await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          cards: { $in: req.body.cards },
        },
      }
    );
    /// Decrease a number of favorites in card
    await Card.updateOne(
      { cardNumber: req.body.cards[0] },
      { $inc: { favorites: -1 } }
    );

    res.json(data);
  } catch (e) {
    res.status(400).json(e);
  }
});
/// get user information
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

/// create new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      errors: {
        email: "User already registered.",
      },
    });

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
