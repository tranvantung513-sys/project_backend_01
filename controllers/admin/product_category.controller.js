const ProductCategory = require("../../models/product_category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const record = await ProductCategory.find(find);
  const newRecord = createTreeHelper.tree(record);

  res.render("admin/page/product_category/index", {
    pageTitle: "Danh mục sản phẩm",
    record: newRecord,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const record = await ProductCategory.find(find);
  const newRecord = createTreeHelper.tree(record);

  res.render("admin/page/product_category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    record: newRecord,
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/product_category`);
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({
      _id: id,
      deleted: false,
    });

    const record = await ProductCategory.find({
      deleted: false,
    });
    const newRecord = createTreeHelper.tree(record);
    res.render("admin/page/product_category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      record: newRecord,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product_category`);
  }
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({ _id: id }, req.body);
  res.redirect(`${systemConfig.prefixAdmin}/product_category`);
};
