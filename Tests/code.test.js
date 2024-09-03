const request = require("supertest");
const http = require("http");
const { getAllbooks } = require("../controller");
const { app } = require("../index");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getAllbooks: jest.fn()
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
        let mockBooks = [
          {
              'bookId': 1,
              'title': 'To Kill a Mockingbird',
              'author': 'Harper Lee',
              'genre': 'Fiction'
          },
          {
              'bookId': 2,
              'title': '1984',
              'author': 'George Orwell',
              'genre': 'Dystopian'
          },
          {
              'bookId': 3,
              'title': 'The Great Gatsby',
              'author': 'F. Scott Fitzgerald',
              'genre': 'Classic'
          }
        ];
        
        getAllbooks.mockReturnValue(mockBooks);
        expect(getAllbooks()).toEqual(mockBooks);
        expect(getAllbooks().length).toBe(3);
    });
});

describe("test all the api's",  () => {
    it("this api should return all books", async () => {
        let mockBooks = [
          {
              'bookId': 1,
              'title': 'To Kill a Mockingbird',
              'author': 'Harper Lee',
              'genre': 'Fiction'
          },
          {
              'bookId': 2,
              'title': '1984',
              'author': 'George Orwell',
              'genre': 'Dystopian'
          },
          {
              'bookId': 3,
              'title': 'The Great Gatsby',
              'author': 'F. Scott Fitzgerald',
              'genre': 'Classic'
          }
        ];

        const res = await request(server).get("/books");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mockBooks);
    });

    it('this api should return books by its id', async () => {
        const res = await request(server).get("/books/details/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
          'bookId': 1,
          'title': 'To Kill a Mockingbird',
          'author': 'Harper Lee',
          'genre': 'Fiction'
      });
    });
});
