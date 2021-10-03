const chai = require("chai");
const chaiHttp = require("chai-http");

const CurrencyFormat = require("../models/currencyFormat");
const server = require("../handler");

const should = chai.should();

chai.use(chaiHttp);

describe("CurrencyFormats", () => {
  before((done) => {
    CurrencyFormat.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/POST currency-formats", () => {
    it("it should not POST a currency format without currencyCode field", (done) => {
      const currencyFormat = {
        country: "Ecuador",
        currencySymbol: "$",
        currencySymbolPosition: "before",
        displayCents: true,
        delimiterThousands: ",",
      };
      chai
        .request(server)
        .post("/currency-formats")
        .send(currencyFormat)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("currencyCode");
          res.body.errors.currencyCode.should.have
            .property("kind")
            .eql("required");
          done();
        });
    });
    it("it should POST a currency format ", (done) => {
      const currencyFormat = {
        country: "Ecuador",
        currencyCode: "USD",
        currencySymbol: "$",
        currencySymbolPosition: "before",
        displayCents: true,
        delimiterThousands: ",",
      };
      chai
        .request(server)
        .post("/currency-formats")
        .send(currencyFormat)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Currency format successfully added!");
          res.body.savedCurrencyFormat.should.have.property("country");
          res.body.savedCurrencyFormat.should.have.property("currencyCode");
          res.body.savedCurrencyFormat.should.have.property("currencySymbol");
          res.body.savedCurrencyFormat.should.have.property(
            "currencySymbolPosition"
          );
          res.body.savedCurrencyFormat.should.have.property("displayCents");
          res.body.savedCurrencyFormat.should.have.property(
            "delimiterThousands"
          );
          done();
        });
    });
  });
  describe("/GET currency-formats", () => {
    it("it should GET all the currency formats", (done) => {
      chai
        .request(server)
        .get("/currency-formats")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });
  describe("/GET/:id currency-formats", () => {
    it("it should GET a currency format  by the given id", (done) => {
      const currencyFormat = new CurrencyFormat({
        country: "Autralia",
        currencyCode: "USD",
        currencySymbol: "$",
        currencySymbolPosition: "after",
        displayCents: false,
        delimiterThousands: ",",
      });
      currencyFormat.save().then((newCurrencyFormat) => {
        chai
          .request(server)
          .get("/currency-formats/" + newCurrencyFormat._id)
          .send(newCurrencyFormat)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("country");
            res.body.should.have.property("currencyCode");
            res.body.should.have.property("currencySymbol");
            res.body.should.have.property("currencySymbolPosition");
            res.body.should.have.property("displayCents");
            res.body.should.have.property("delimiterThousands");
            res.body.should.have
              .property("_id")
              .eql(newCurrencyFormat._id.toString());
            done();
          });
      });
    });
  });
  describe("/PATCH/:id currency format", () => {
    it("it should UPDATE a currency format  given the id", (done) => {
      const currencyFormat = new CurrencyFormat({
        country: "Mexico",
        currencyCode: "USD",
        currencySymbol: "$",
        currencySymbolPosition: "after",
        displayCents: true,
        delimiterThousands: ",",
      });
      currencyFormat.save().then((newCurrencyFormat) => {
        chai
          .request(server)
          .patch("/currency-formats/" + newCurrencyFormat._id)
          .send({
            country: "Irlanda",
            currencyCode: "EUR",
            currencySymbol: "#",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Currency format updated!");
            res.body.CurrencyFormatUpdated.should.have
              .property("currencySymbol")
              .eql("#");
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id currency format", () => {
    it("it should DELETE a currency format given the id", (done) => {
      const currencyFormat = new CurrencyFormat({
        country: "Mexico",
        currencyCode: "USD",
        currencySymbol: "$",
        currencySymbolPosition: "after",
        displayCents: true,
        delimiterThousands: ",",
      });
      currencyFormat.save().then((newCurrencyFormat) => {
        chai
          .request(server)
          .delete("/currency-formats/" + newCurrencyFormat._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Currency format successfully deleted!");
            res.body.should.have.property("result").eql({ deletedCount: 1 });
            done();
          });
      });
    });
  });
});
