const request = require("supertest");
const http = require("http");
const { getAllMovies } = require("../controller");
const { app } = require("../index");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getAllMovies: jest.fn()
}));

let server;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(3001, done); 
});

afterAll(done => {
    server.close(done);
});

describe("test controller functions", () => {
    beforeEach(() => jest.clearAllMocks());

    it('should get all movies', async () => {
        let mockMovies =[
            {
              'movieId': 1,
              'title': 'Inception',
              'genre': 'Sci-Fi',
              'director': 'Christopher Nolan'
            },
            {
              'movieId': 2,
              'title': 'The Shawshank Redemption',
              'genre': 'Drama',
              'director': 'Frank Darabont'
            },
            {
              'movieId': 3,
              'title': 'The Godfather',
              'genre': 'Crime',
              'director': 'Francis Ford Coppola'
            }
          ];
        
        getAllMovies.mockReturnValue(mockMovies);
        expect(getAllMovies()).toEqual(mockMovies);
        expect(getAllMovies().length).toBe(3);
    });
});

describe("test all the api's",  () => {
    it("this api should return all movies", async () => {
        let mockMovies = [
            {
              'movieId': 1,
              'title': 'Inception',
              'genre': 'Sci-Fi',
              'director': 'Christopher Nolan'
            },
            {
              'movieId': 2,
              'title': 'The Shawshank Redemption',
              'genre': 'Drama',
              'director': 'Frank Darabont'
            },
            {
              'movieId': 3,
              'title': 'The Godfather',
              'genre': 'Crime',
              'director': 'Francis Ford Coppola'
            }
          ];

        const res = await request(server).get("/movies");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mockMovies);
    });

    it('this api should return movies by its id', async () => {
        const res = await request(server).get("/movies/details/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          });
    });
});
