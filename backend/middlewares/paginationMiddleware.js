// middlewares/paginationMiddleware.js
const paginate = (req, res, next) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      req.pagination = {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
      };
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = paginate;
  