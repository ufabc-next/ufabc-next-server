const assert = require("assert")
const throwMissingParameter = require("./throwMissingParameter");

describe("helpers/validate/throwMissingParameter", () => {
    describe("fields should match object keys", () => {
        it("matching keys", () => {
            const object = {
                keyone: "value",
                keytwo: "another value"
            }

            const fields = ["keyone", "keytwo"]

            throwMissingParameter(fields, object)
        })
        it("number of keys in object is greater than fields size", () => {
            const object = {
                keyone: "value",
                keytwo: "another value",
                keythree: "different value"
            }

            const fields = ["keyone", "keytwo"]

            throwMissingParameter(fields, object)
        })
        it("doesn't matching keys", async () => {
            const object = {
                keyone: "value",
                keytwo: "another value"
            }

            const fields = ["keyone", "randomkey"]


            await assertFuncThrows("MissingParameter", throwMissingParameter, fields, object)
        })
        it("object and fields are empty", async () => {
            const object = {}
            

            const fields = []


            throwMissingParameter(fields, object)
        })
    })
})