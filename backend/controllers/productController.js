const Product = require('./../models/productModel');

exports.getAllProducts = async (req, res) => {
  const user = req.query.username;
  var products ;
  if(user) {
     products = await Product.find({ username: user});
  }
  else {
     products = await Product.find();
  }
  
  try {
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  }
  catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    })

  }

}

exports.addNewProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getProduct = async (req, res) => {

  const product = await Product.findById(req.params.id);

  try {
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  }
  catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    })

  }
}

exports.updateProduct = async (req, res) => {

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  }
  catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    })

  }

}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null
    });
  }
  catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    })

  }
}