const assert = require("assert");
const errors = require("@/errors");
const parseError = require("./error");

describe("helpers/parse/error", async function () {
  const defaultError = "Some error";
  const expectedErrors = [
    {
      expectedName: "BadRequest",
      expectedType: "BadRequest",
      expectedStatus: 400,
    },
    {
      expectedName: "Unauthorized",
      expectedType: "Unauthorized",
      expectedStatus: 401,
    },
    {
      expectedName: "Forbidden",
      expectedType: "Forbidden",
      expectedStatus: 403,
    },
    {
      expectedName: "NotFound",
      expectedType: "NotFound",
      expectedStatus: 404,
    },
    {
      expectedName: "Conflict",
      expectedType: "Conflict",
      expectedStatus: 409,
    },
    {
      expectedName: "Unprocessable",
      expectedType: "Unprocessable",
      expectedStatus: 422,
    },
  ];
  describe("with an mapped error", async function () {
    for (const expectedError of expectedErrors) {
      it(`parse an ${expectedError.expectedName}`, async function () {
        const error = new errors[expectedError.expectedName](defaultError);
        const parsedError = parseError(error);

        assert.equal(defaultError, parsedError.error);
        assert.equal(expectedError.expectedName, parsedError.name);
        assert.equal(expectedError.expectedType, parsedError.type);
        assert.equal(expectedError.expectedStatus, parsedError.status);
      });
    }
  });
  it("with an different class error", async function () {
    const error = {
      type: "Unprocessable",
      status: 422,
    };

    const parsedError = parseError(error);

    assert.equal(error.type, parsedError.type);
    assert.equal(error.status, parsedError.status);
  });
  it("with an unexpected error", async function () {
    const expectedError = "Some error";
    const error = new Error(expectedError);

    const parsedError = parseError(error);

    assert.equal(parsedError.status, 500);
    assert.equal(parsedError.name, "FatalError");
    assert.equal(parsedError.type, "Error");
    assert.equal(parsedError.error, expectedError);
  });
});
