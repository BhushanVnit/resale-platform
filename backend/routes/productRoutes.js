const express = require("express");
const productController = require("./../controllers/productController")
const router = express.Router();
const jwt = require('jsonwebtoken');

// function protectRoute(req, res, next) {
//     // Get the token from the request header
//     const token = req.headers.authorization;
//     JWT_SECRET = 'sothisismy32characterstringforjwtauthentication';

//     // If no token is provided, return an error
//     if (!token) {
//         console.log('No token provided')
//         return res.status(401).json({ message: 'Unauthorized, no token provided' });
//     }

//     // Verify the token
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         console.log(err.message)
//         return res.status(401).json({ message: 'Unauthorized, invalid token' });
//     }
// }


// router.use('/');
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, sothisismy32characterstringforjwtauthentication);
      req.userId = data.id;
      req.userRole = data.role;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.addNewProduct);

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;