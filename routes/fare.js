const CurrencyFormat = require("../models/currencyFormat");
const { formatFare } = require("../utils");

/*
 * GET /fare route to retrieve formatted fare
 */
const getFares = (req, res) => {
  const { country } = req.params;
  const query = CurrencyFormat.find({
    ...(country ? { country } : {}),
  });
  query.exec().then((currencyFormats) => {
    const formattedFares = [];
    for (const cf of currencyFormats) {
      formattedFares.push(formatFare(cf));
    }
    res.json(formattedFares);
  });
};

//export all the functions
module.exports = {
  getFares,
};
