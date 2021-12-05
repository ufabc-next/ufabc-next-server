const _ = require("lodash");
const assert = require("assert");
const pickFields = require("./pickFields");

describe("helpers/parse/pickFields", async function () {
  describe("should return vlaid fields", async function () {
    it("with plain object", async function () {
      const payload = {
        valid: "valid",
        invalid: "invalid",
      };

      const fields = ["valid"];

      const afterPickPayload = pickFields(payload, fields);

      assert(afterPickPayload.valid);
      assert(!afterPickPayload.invalid);
    });
    it("with nested object", async function () {
      const payload = {
        valid: "valid",
        nested: {
          valid: "valid",
          invalid: "invalid",
        },
        invalid: "invalid",
      };

      const fields = ["valid", "nested.valid"];

      const afterPickPayload = pickFields(payload, fields);

      assert(afterPickPayload.valid);
      assert(!afterPickPayload.invalid);
      assert(afterPickPayload.nested.valid);
      assert(!afterPickPayload.nested.invalid);
    });
    it("with nested array object", async function () {
      const payload = {
        valid: "valid",
        nested: {
          valid: "valid",
          invalid: "invalid",
          array: [
            {
              valid: "valid",
              invalid: "invalid",
            },
          ],
        },
        invalid: "invalid",
      };

      const fields = ["valid", "nested.valid", "nested.array.valid"];

      const afterPickPayload = pickFields(payload, fields);

      assert(afterPickPayload.valid);
      assert(!afterPickPayload.invalid);
      assert(afterPickPayload.nested.valid);
      assert(!afterPickPayload.nested.invalid);
      assert(afterPickPayload.nested.array[0].valid);
      assert(!afterPickPayload.nested.array[0].invalid);
    });
    it("with an array", async function () {
      const payload = [
        {
          valid: "valid",
          nested: {
            valid: "valid",
            invalid: "invalid",
            array: [
              {
                valid: "valid",
                invalid: "invalid",
              },
            ],
          },
          invalid: "invalid",
        },
      ];

      const fields = ["valid", "nested.valid", "nested.array.valid"];

      const afterPickPayload = pickFields(payload, fields);

      assert(afterPickPayload[0].valid);
      assert(!afterPickPayload[0].invalid);
      assert(afterPickPayload[0].nested.valid);
      assert(!afterPickPayload[0].nested.invalid);
      assert(afterPickPayload[0].nested.array[0].valid);
      assert(!afterPickPayload[0].nested.array[0].invalid);
    });
  });
});