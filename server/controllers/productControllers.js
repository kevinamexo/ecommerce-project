const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Product = require("../models/Product");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    data: products,
  });
});

exports.addNewProducts = asyncHandler(async (req, res, next) => {
  let product = await Product.find({ name: req.body.name });

  if (product) {
    return next(ErrorResponse(`${req.params.name} already exists`, 409));
  }

  product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: `${product.name} added`,
  });
});

exports.findProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.updateProductById = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.deleteProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }
  let name = product.name;

  await Product.remove(product);

  res.status(201).json({
    success: true,
    message: `${name} deleted`,
  });
});

// search controller

exports.findProductByName = asyncHandler(async (req, res, next) => {
  let reqQuery = { ...req.query };
  let searchQuery = reqQuery.search_query;

  //deal with filtering and sorting when you're done

  // let searchQueryString= JSON.stringify(searchQuery);

  let term = new RegExp(`${searchQuery}`, "i");

  let searchResults = await Product.find({ name: term });

  console.log(searchQuery);
  res.status(201).json({
    success: true,
    data: searchResults,
    message: "Find by name route",
  });
});
