const app = require("@/app");
const assert = require("assert");
const populate = require("@/populate");
const sinon = require("sinon");
const Axios = require("axios");

const func = require("./func");
const sync = require("@/api/disciplinas/sync/func");

describe("GET /v1/disciplinas", function () {
  beforeEach(async function () {
    await populate({ operation: "both", only: ["disciplinas", "subjects"] });
  });

  describe("func", function () {
    let axiosInstanceStub;
    let axiosGetStub;
    beforeEach(async function () {
      let file = app.helpers.test.getDisciplinas();
      file.data = app.helpers.test.sample(file.data, 100);
      axiosInstanceStub = sinon.stub(Axios, "create").returns(Axios);
      axiosGetStub = sinon.stub(Axios, "get").returns(file);
      await sync();
    });

    afterEach(function () {
      axiosInstanceStub.restore();
      axiosGetStub.restore();
    });

    it("returns a complete list of disciplinas", async function () {
      let resp = await func();
      assert.equal(resp.length, 100);
    });
  });
});
