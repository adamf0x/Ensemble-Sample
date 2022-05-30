const request = require("supertest");
const app = require("../server");

//tests for GET routes
describe("Movies", () => {
  describe("get all movies", () => {
    it("Should respond with a 200", async () => {
      const res = await request(app).get("/api/getMovies");
      expect(res.statusCode).toBe(200);
    });
  });
});

describe("Movies", () => {
  describe("get movie by title", () => {
    describe("given a movie title to search for", () => {
      it("Should respond with a 200", async () => {
        const res = await request(app).get("/api/searchMovieTitle?title=New movie");
        expect(res.statusCode).toBe(200);
      });
    });
  });
});

//tests for POST routes
describe("Movies", () => {
  describe("create new movie", () => {
    describe("given all attributes of a new movie", () => {
      it("Should respond with a 200", async () => {
        const res = await request(app).post("/api/createMovie").send({
          title: "New movie for test",
          description: "A new movie for testing",
          release_year: "02/19/2020",
          duration: 5400,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success")
      });
    });
  });
});

//tests for PATCH routes

describe("Movies", () => {
  describe("update movie", () => {
    describe("given new attributes for an existing movie", () => {
      it("Should respond with a 200", async () => {
        const res = await request(app).patch("/api/updateMovie/1").send({
          title: "New movie for test edited",
          description: "A new movie for testing edit"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success")
      });
    });
  });
});

describe("Movies", () => {
  describe("update movie rating", () => {
    describe("given updated rating for an existing movie", () => {
      it("Should respond with a 200", async () => {
        const res = await request(app).patch("/api/updateMovieRating/1").send({
          rating: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success")
      });
    });
  });
});

//tests for DELETE routes

describe("Movies", () => {
  describe("delete movie with title", () => {
    describe("given a movie title to delete", () => {
      it("Should respond with a 200", async () => {
        const res = await request(app).delete("/api/deleteMovie?title=New movie");
        expect(res.statusCode).toBe(200);
      });
    });
  });
});