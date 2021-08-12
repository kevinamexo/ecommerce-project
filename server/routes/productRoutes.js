const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

router.route("/").get(productControllers.getAllProducts);

router
  .route("/:id")
  .get(productControllers.findProductById)
  .put(productControllers.updateProductById)
  .delete(productControllers.deleteProductById);

module.exports = router;
