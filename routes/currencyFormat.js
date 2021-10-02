const CurrencyFormat = require("../models/currencyFormat");

/*
 * GET /currencyFormat route to retrieve all the CurrencyFormats.
 */
const getCurrencyFormats = (req, res) => {
  const query = CurrencyFormat.find({});
  query.exec((err, CurrencyFormats) => {
    if (err) res.send(err);
    res.json(CurrencyFormats);
  });
};

/*
 * POST /currencyFormat to save a new CurrencyFormat.
 */
const postCurrencyFormat = (req, res) => {
  var newCurrencyFormat = new CurrencyFormat(req.body);
  newCurrencyFormat.save((err, savedCurrencyFormat) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Currency format successfully added!",
        savedCurrencyFormat,
      });
    }
  });
};

/*
 * GET /CurrencyFormat/:id route to retrieve a CurrencyFormat given its id.
 */
const getCurrencyFormat = (req, res) => {
  CurrencyFormat.findById(req.params.id, (err, CurrencyFormat) => {
    if (err) res.send(err);
    res.json(CurrencyFormat);
  });
};

/*
 * DELETE /CurrencyFormat/:id to deconste a CurrencyFormat given its id.
 */
const deleteCurrencyFormat = (req, res) => {
  CurrencyFormat.remove({ _id: req.params.id }, (err, result) => {
    res.json({ message: "Currency format successfully deleted!", result });
  });
};

/*
 * PUT /CurrencyFormat/:id to updatea a CurrencyFormat given its id
 */
const updateCurrencyFormat = (req, res) => {
  CurrencyFormat.findById({ _id: req.params.id }, (err, CurrencyFormat) => {
    if (err) res.send(err);
    Object.assign(CurrencyFormat, req.body).save((CurrencyFormat) => {
      if (err) res.send(err);
      res.json({ message: "Currency format updated!", CurrencyFormat });
    });
  });
};

//export all the functions
module.exports = {
  getCurrencyFormats,
  postCurrencyFormat,
  getCurrencyFormat,
  deleteCurrencyFormat,
  updateCurrencyFormat,
};
