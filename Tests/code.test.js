const request = require("supertest");
const http = require("http");
const { getAllgames } = require("../controller");
const { app } = require("../index");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getAllgames: jest.fn()
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

    it('should get all games', async () => {
        let mockGames = [
          {
            'gameId': 1,
            'title': 'The Legend of Zelda: Breath of the Wild',
            'genre': 'Adventure',
            'platform': 'Nintendo Switch'
          },
          {
            'gameId': 2,
            'title': 'Red Dead Redemption 2',
            'genre': 'Action',
            'platform': 'PlayStation 4'
          },
          {
            'gameId': 3,
            'title': 'The Witcher 3: Wild Hunt',
            'genre': 'RPG',
            'platform': 'PC'
          }
        ];
        
        getAllgames.mockReturnValue(mockGames);
        expect(getAllgames()).toEqual(mockGames);
        expect(getAllgames().length).toBe(3);
    });
});

describe("test all the api's",  () => {
    it("this api should return all games", async () => {
        let mockGames = [
          {
            'gameId': 1,
            'title': 'The Legend of Zelda: Breath of the Wild',
            'genre': 'Adventure',
            'platform': 'Nintendo Switch'
          },
          {
            'gameId': 2,
            'title': 'Red Dead Redemption 2',
            'genre': 'Action',
            'platform': 'PlayStation 4'
          },
          {
            'gameId': 3,
            'title': 'The Witcher 3: Wild Hunt',
            'genre': 'RPG',
            'platform': 'PC'
          }
        ];

        const res = await request(server).get("/games");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mockGames);
    });

    it('this api should return games by its id', async () => {
        const res = await request(server).get("/games/details/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
          'gameId': 1,
          'title': 'The Legend of Zelda: Breath of the Wild',
          'genre': 'Adventure',
          'platform': 'Nintendo Switch'
        });
    });
});
