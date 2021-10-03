const CurrencyFormat = require("../models/currencyFormat");
const { formatFare } = require("../utils");

/*
 * GET /fare route to retrieve formatted fare
 */
const getFares = (req, res) => {
  const { country, display = "symbol" } = req.query;
  const query = CurrencyFormat.find({
    ...(country ? { country } : {}),
  });
  query.exec().then((currencyFormats) => {
    const formattedFares = [];
    for (const cf of currencyFormats) {
      formattedFares.push({
        country: cf.country,
        format: formatFare(cf, display),
      });
    }
    res.json(formattedFares);
  });
};

//export all the functions
module.exports = {
  getFares,
};
