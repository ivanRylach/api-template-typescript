import { it } from "mocha";
import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import { server } from "../../src/server";
import { Record } from "../../build/models/record";

describe("Records", () => {
  describe("#createRecord", () => {
    it("creates a new record", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/api/v1/records",
      });

      expect(response.statusCode).to.be.equal(StatusCodes.OK);

      const responsePayload: Record = JSON.parse(response.body);

      expect(responsePayload.id).to.exist;
    });
  });

  describe("#fetchRecord", () => {
    it("fetches a record by name", async () => {
      let response = await server.inject({
        method: "POST",
        url: "/api/v1/records",
      });

      expect(response.statusCode).to.be.equal(StatusCodes.OK);

      const inserted: Record = JSON.parse(response.body);

      response = await server.inject({
        method: "GET",
        url: `/api/v1/records/${inserted.details.name}`,
      });

      expect(response.statusCode).to.be.equal(StatusCodes.OK);

      const fetched: Record = JSON.parse(response.body);

      expect(fetched.details.name).to.be.equal(inserted.details.name);
      expect(fetched.details.description).to.be.equal(inserted.details.description);
    });
  });
});
