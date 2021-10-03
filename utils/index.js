const { CURRENCY_SYMBOL_POSITION, DELIMITERS } = require("../constants");
const formatFare = (currencyFormat, display) => {
  const thousand = "##";
  const hundred = "###";
  const decimal = "##";

  let formattedFare = thousand;
  formattedFare = thousand + currencyFormat.delimiterThousands + hundred;
  if (currencyFormat.displayCents)
    formattedFare =
      formattedFare +
      Object.values(DELIMITERS).filter(
        (d) => d != currencyFormat.delimiterThousands
      )[0] +
      decimal;
  console.log(display);
  const symbol =
    display === "symbol"
      ? currencyFormat.currencySymbol
      : currencyFormat.currencyCode;
  if (currencyFormat.currentSymbolPosition === CURRENCY_SYMBOL_POSITION.BEFORE)
    formattedFare = symbol + formattedFare;
  else formattedFare = formattedFare + symbol;
  return formattedFare;
};

module.exports = {
  formatFare,
};
