const mongoose = require("mongoose");
const { CURRENCY_SYMBOL_POSITION, DELIMITERS } = require("../constants");
const { Schema } = mongoose;

const CurrencyFormatSchema = new Schema(
  {
    currencyCode: { type: String, required: true },
    country: { type: String, required: true },
    displayCents: { type: Boolean, default: true },
    currencySymbol: { type: String, required: true },
    currencySymbolPosition: {
      type: String,
      enum: Object.values(CURRENCY_SYMBOL_POSITION),
      default: CURRENCY_SYMBOL_POSITION.BEFORE,
    },
    delimiterThousands: {
      type: String,
      enum: Object.values(DELIMITERS),
      default: DELIMITERS.COMMA,
    },
  },
  {
    versionKey: false,
  }
);

CurrencyFormatSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("currencyFormats", CurrencyFormatSchema);
