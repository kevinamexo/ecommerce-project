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
  if (req.query) {
    console.log(req.query);
  }
  let product = await Product.findById(req.params.id);
  // let product = await Product.findById(req.params.id);
  let c = product.countInStock;
  let count = c;

  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }
  if (req.query.type === "addToStock") {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        countInStock: count + Number(req.query.amount),
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else if ((req.query.type = "removeFromStock")) {
    if (req.query.amount > count) {
      return next(
        new ErrorResponse("Requested amount exceeds count in stock", 400)
      );
    }

    product = await Product.findByIdAndUpdate(req.params.id, {
      countInStock: count - Number(req.query.amount),
    });
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  }
  res.status(201).json({
    success: true,
    data: product,
    prevStock: count,
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

exports.updateStock = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const stock = req.params.stock;

  console.log(id);
  console.log(stock);

  // let product = await Hotel.findById(id);
  // let prevAmomunt = product.countInStock;
  // if (!product) {
  //   return next(ErrorResponse(`Product with id ${id} not found`, 404));
  // }

  // console.log(prevAmount + req.body.counInStock);

  // let product = await Product.findByIdAndUpdate(

  //   id,
  //   {
  //     countInStock: prevAmount + Number(req.body.countInStock),
  //   },
  //   {
  //     runValidators: true,
  //     new: true,
  //   }
  // );

  res.status(200).json({
    success: true,
    message: `${product} updated, req`,
  });
});
