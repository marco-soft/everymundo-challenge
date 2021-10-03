const CurrencyFormat = require("../models/currencyFormat");
const { ObjectId } = require("mongoose").Types;

/*
 * GET /currencyFormat route to retrieve all the CurrencyFormats.
 */
const getCurrencyFormats = (req, res) => {
  const query = CurrencyFormat.find({});
  query.exec().then((CurrencyFormats) => {
    res.json(CurrencyFormats);
  });
};

/*
 * POST /currencyFormat to save a new CurrencyFormat.
 */
const postCurrencyFormat = (req, res) => {
  var newCurrencyFormat = new CurrencyFormat(req.body);
  newCurrencyFormat
    .save()
    .then((savedCurrencyFormat) => {
      res.json({
        message: "Currency format successfully added!",
        savedCurrencyFormat,
      });
    })
    .catch((error) => {
      res.status(422).json({
        message: "Currency format can not be added!",
        ...error,
      });
    });
};

/*
 * GET /CurrencyFormat/:id route to retrieve a CurrencyFormat given its id.
 */
const getCurrencyFormat = (req, res) => {
  CurrencyFormat.findOne({ _id: ObjectId(req.params.id) }).then(
    (CurrencyFormatFound) => {
      if (CurrencyFormatFound) res.json(CurrencyFormatFound);
      res.sstatus(404).json({ message: "Currency format not found" });
    }
  );
};

/*
 * DELETE /CurrencyFormat/:id to deconste a CurrencyFormat given its id.
 */
const deleteCurrencyFormat = (req, res) => {
  CurrencyFormat.deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    res.json({ message: "Currency format successfully deleted!", result });
  });
};

/*
 * PUT /CurrencyFormat/:id to updatea a CurrencyFormat given its id
 */
const updateCurrencyFormat = (req, res) => {
  CurrencyFormat.findOne({ _id: ObjectId(req.params.id) }).then(
    (CurrencyFormatFound) => {
      if (CurrencyFormatFound) {
        Object.assign(CurrencyFormatFound, req.body)
          .save()
          .then((CurrencyFormatUpdated) => {
            res.json({
              message: "Currency format updated!",
              CurrencyFormatUpdated,
            });
          });
      } else {
        res.status(404).json({
          message: "Currency format not found!",
        });
      }
    }
  );
};

//export all the functions
module.exports = {
  getCurrencyFormats,
  postCurrencyFormat,
  getCurrencyFormat,
  deleteCurrencyFormat,
  updateCurrencyFormat,
};
