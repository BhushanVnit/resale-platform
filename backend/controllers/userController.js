const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
}

exports.addNewUser = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
}

exports.getUser = async (req, res) => {

  const jwtToken = req.headers.authorization;
  const username = req.query.username;

  if (!jwtToken && !username) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized. No token provided."
    });
  }

  if(jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.status(200).json({
        status: "success",
        data: {
          user
        }
      });
    } catch (error) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized. Invalid token."
      });
    }
  } else if (username) {
    try {
      const user = await User.find({ username: username});
     
      res.status(200).json({
        status: "success",
        data: {
          user
        }
      });

    }catch(err) {

    }
  }
  
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success'
  })
}

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
}