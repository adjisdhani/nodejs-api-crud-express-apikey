const Book = require('../models/bookModel');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getBookById: async (req, res) => {
    try {
      const book = await Book.getById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createBook: async (req, res) => {
    try {
      const result = await Book.create(req.body);
      res.status(201).json({ id: result[0].insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateBook: async (req, res) => {
    try {
      await Book.update(req.params.id, req.body);
      res.json({ message: 'Book updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Book.delete(req.params.id);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = bookController;