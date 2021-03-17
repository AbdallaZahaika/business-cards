const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const _ = require("lodash");
const { Card, validateCard, generateCardNumber } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

/// search in your cards
router.get("/search/mycard/:cardNumber", auth, (req, res) => {
  let cardNumber = req.params.cardNumber;
  Card.findOne({ user_id: req.user._id, cardNumber: cardNumber })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(400).json({ error: e });
    });
});

//search
router.get("/search", auth, (req, res) => {
  const searchQ = req.query.q;
  let expSearchQ = new RegExp(searchQ, "i");

  Card.findOne({ $or: [{ cardPhone: expSearchQ }, { cardNumber: expSearchQ }] })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(400).json({ error: e });
    });
});

/// get all cards
router.get("/allCards", auth, async (req, res) => {
  /// perPage
  let perPage = req.query.perPage ? req.query.perPage : 9;
  /// page
  let page = req.query.page ? req.query.page * perPage : 0;
  try {
    const cards = await Card.find({}, { user_id: 0, _id: 0, __v: 0 })
      .limit(perPage)
      .skip(page);
    res.json(cards);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
//count cards
router.get("/count/cards", auth, (req, res) => {
  Card.aggregate([
    {
      $count: "user_id",
    },
  ])
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

/// get all user cards
router.get("/allmyCards", auth, async (req, res) => {
  /// perPage
  let perPage = req.query.perPage ? req.query.perPage : 9;
  /// page
  let page = req.query.page ? req.query.page * perPage : 0;
  try {
    const cards = await Card.find({ user_id: req.user._id })
      .limit(perPage)
      .skip(page);
    res.send(cards);
  } catch (e) {
    res.status(400).json(e);
  }
});

//count of my cards
router.get("/count/mycards", auth, (req, res) => {
  Card.aggregate([
    {
      $match: { user_id: ObjectId(req.user._id) },
    },
    {
      $count: "user_id",
    },
  ])
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

/// delete card
router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

/// edite card
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

/// create new card
router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let defaultImg = {
    file: {
      path: "/public/defula_avatir_image.png",
      name: "defula_avatir_image",
    },
  };
  let card = new Card({
    cardName: req.body.cardName,
    cardDescription: req.body.cardDescription,
    cardAddress: req.body.cardAddress,
    cardPhone: req.body.cardPhone,

    cardImage: req.body.cardImage ? req.body.cardImage : defaultImg,
    cardNumber: await generateCardNumber(Card),
    user_id: req.user._id,
    biz: req.user.biz,
  });

  post = await card.save();
  res.send(post);
});

module.exports = router;
