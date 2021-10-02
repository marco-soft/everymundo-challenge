const chai = require("chai");
const chaiHttp = require("chai-http");

const CurrencyFormat = require("../models/currencyFormat");
const server = require("../handler");

const should = chai.should();

chai.use(chaiHttp);

describe("CurrencyFormats", () => {
  beforeEach((done) => {
    CurrencyFormat.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/POST currency-formats", () => {
    it("it should not POST a currency format without currencyCode field", (done) => {
      const currencyFormat = {
        country: "Ecuador",
        currencySymbol: "$",
        currencySymbolPosition: "BEFORE",
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
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("currencyCode");
          res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
    });
    it("it should POST a currency format ", (done) => {
      const currencyFormat = {
        country: "Ecuador",
        currencyCode: "USD",
        currencySymbol: "$",
        currencySymbolPosition: "BEFORE",
        displayCents: true,
        delimiterThousands: ",",
      };
      chai
        .request(server)
        .post("/currency-format")
        .send(currencyFormat)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Currency format successfully added!");
          res.body.CurrencyFormat.should.have.property("country");
          res.body.CurrencyFormat.should.have.property("currencyCode");
          res.body.CurrencyFormat.should.have.property("currencySymbol");
          res.body.CurrencyFormat.should.have.property(
            "currencySymbolPosition"
          );
          res.body.CurrencyFormat.should.have.property("displayCents");
          res.body.CurrencyFormat.should.have.property("delimiterThousands");
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
        currencySymbolPosition: "AFTER",
        displayCents: false,
        delimiterThousands: ",",
      });
      currencyFormat.save((err, newCurrencyFormat) => {
        chai
          .request(server)
          .get("/currency-formats/" + newCurrencyFormat.id)
          .send(newCurrencyFormat)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("country");
            res.body.should.have.property("countryCode");
            res.body.should.have.property("currentSymbol");
            res.body.should.have.property("currentSymbolPosition");
            res.body.should.have.property("displayCents");
            res.body.should.have.property("delimiterThousands");
            res.body.should.have.property("_id").eql(currencyformats.id);
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
        currencySymbolPosition: "AFTER",
        displayCents: true,
        delimiterThousands: ",",
      });
      currencyFormat.save((newCurrencyFormat) => {
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
            res.body.CurrencyFormat.should.have
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
        currencySymbolPosition: "AFTER",
        displayCents: true,
        delimiterThousands: ",",
      });
      currencyFormat.save((newCurrencyFormat) => {
        chai
          .request(server)
          .delete("/currency-formats/" + newCurrencyFormat._id)
          .end((err, res) => {
            should.equal(res.status, 200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Currency format successfully deleted!");
            done();
          });
      });
    });
  });
});
