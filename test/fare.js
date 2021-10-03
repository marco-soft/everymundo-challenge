const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../handler");

chai.use(chaiHttp);

describe("Fares", () => {
  describe("/GET fares", () => {
    it("it should retrieve the fare correctly formatted", (done) => {
      chai
        .request(server)
        .get("/fares")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("it should retrieve the fare with currency code", (done) => {
      chai
        .request(server)
        .get("/fares?display=CurrencyCode")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].format.should.include("USD");
          done();
        });
    });
    // it("it should POST a currency format ", (done) => {
    //   const currencyFormat = {
    //     country: "Ecuador",
    //     currencyCode: "USD",
    //     currencySymbol: "$",
    //     currencySymbolPosition: "before",
    //     displayCents: true,
    //     delimiterThousands: ",",
    //   };
    //   chai
    //     .request(server)
    //     .post("/currency-formats")
    //     .send(currencyFormat)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a("object");
    //       res.body.should.have
    //         .property("message")
    //         .eql("Currency format successfully added!");
    //       res.body.savedCurrencyFormat.should.have.property("country");
    //       res.body.savedCurrencyFormat.should.have.property("currencyCode");
    //       res.body.savedCurrencyFormat.should.have.property("currencySymbol");
    //       res.body.savedCurrencyFormat.should.have.property(
    //         "currencySymbolPosition"
    //       );
    //       res.body.savedCurrencyFormat.should.have.property("displayCents");
    //       res.body.savedCurrencyFormat.should.have.property(
    //         "delimiterThousands"
    //       );
    //       done();
    //     });
    // });
    // it("it should POST a currency format ", (done) => {
    //   const currencyFormat = {
    //     country: "Ecuador",
    //     currencyCode: "USD",
    //     currencySymbol: "$",
    //     currencySymbolPosition: "before",
    //     displayCents: true,
    //     delimiterThousands: ",",
    //   };
    //   chai
    //     .request(server)
    //     .post("/currency-formats")
    //     .send(currencyFormat)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a("object");
    //       res.body.should.have
    //         .property("message")
    //         .eql("Currency format successfully added!");
    //       res.body.savedCurrencyFormat.should.have.property("country");
    //       res.body.savedCurrencyFormat.should.have.property("currencyCode");
    //       res.body.savedCurrencyFormat.should.have.property("currencySymbol");
    //       res.body.savedCurrencyFormat.should.have.property(
    //         "currencySymbolPosition"
    //       );
    //       res.body.savedCurrencyFormat.should.have.property("displayCents");
    //       res.body.savedCurrencyFormat.should.have.property(
    //         "delimiterThousands"
    //       );
    //       done();
    //     });
    // });
  });
});
