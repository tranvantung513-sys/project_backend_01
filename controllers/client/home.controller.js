const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
// [get] /
module.exports.index = async (req, res) => {
  // Sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);
  const productNew = productHelper.priceNewProducts(productsFeatured);
  // Sản phẩm nổi bật

  // Sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);
  // Sản phẩm mới nhất
  const newproductNew = productHelper.priceNewProducts(productsNew);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: productNew,
    productsNew: newproductNew,
  });
};
