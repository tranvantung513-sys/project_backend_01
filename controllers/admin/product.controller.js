// [get] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const SearchHelper = require("../../helpers/search");
const PaginationHelper = require("../../helpers/pagination");

module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const ObjectSearch = SearchHelper(req.query);

  if (ObjectSearch.regex) {
    find.title = ObjectSearch.regex;
  }
  // pagination
  const countProduct = await Product.countDocuments(find);
  let ObjectPagination = PaginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProduct
  );

  //end pagination
  const products = await Product.find(find)
    .limit(ObjectPagination.limitItems)
    .skip(ObjectPagination.skip);

  res.render("admin/page/product/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: ObjectSearch.keyword,
    pagination: ObjectPagination,
  });
};

module.exports.changStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("/admin/products");
};
