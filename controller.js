let books = [
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

  const getAllbooks = () => {
    return books;
  };

  const getbooksById = (id) => {
    const data = books.find(ele => ele.bookId === Number(id));
    return data;
  };

  module.exports = { getAllbooks, getbooksById }