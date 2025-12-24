const Product = require("../../models/product.model");
const Account = require("../../models/accounts.model");
const ProductCategory = require("../../models/product_category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const SearchHelper = require("../../helpers/search");
const PaginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products
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

  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // end sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(ObjectPagination.limitItems)
    .skip(ObjectPagination.skip);

  for (const product of products) {
    const user = await Account.findOne({
      _id: product.createdBy.account_id,
    });
    if (user) {
      product.accountFullName = user.fullName;
    }
  }

  res.render("admin/page/product/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: ObjectSearch.keyword,
    pagination: ObjectPagination,
  });
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  req.flash("success", "Cập nhật trạng thái thành công");

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("/admin/products");
};
// [PATCH] /admin/products/change-multi
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      // deletedAt: new Date()
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  res.redirect("/admin/products");
};
// [DELETE] /admin/products/delete/:id
module.exports.changMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany(
        {
          _id: {
            $in: ids,
          },
        },
        {
          status: "active",
        }
      );
      req.flash(
        "success",
        `Cập nhật trạng thái của ${ids.length} sản  phẩm thành công`
      );
      break;
    case "inactive":
      await Product.updateMany(
        {
          _id: {
            $in: ids,
          },
        },
        {
          status: "inactive",
        }
      );
      req.flash(
        "success",
        `Cập nhật trạng thái của ${ids.length} sản  phẩm thành công`
      );
      break;

    case "deleted-all":
      await Product.updateMany(
        {
          _id: {
            $in: ids,
          },
        },
        {
          deleted: true,
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          },
        }
      );
      req.flash("success", "Xóa sản phẩm thành công");
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        console.log(id);
        console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", "Thay đổi trạng thái thành công");
      break;
    default:
      break;
  }
  res.redirect("/admin/products");
};
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  const newCategory = createTreeHelper.tree(category);
  res.render("admin/page/product/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  // req.body.position = parseInt(req.body.position);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);
    const category = await ProductCategory.find({ deleted: false });
    const newCategory = createTreeHelper.tree(category);

    res.render("admin/page/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm này");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
// [GET] /admin/products/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    // const updatedB = {
    //   account_id: res.locals.user.id,
    //   updatedAt: new Date(),
    // };
    await Product.updateOne(
      {
        _id: id,
      },
      req.body
    );
    req.flash("success", "Sửa sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
  }
  res.redirect(`${systemConfig.prefixAdmin}/products/edit/${id}`);
};

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/page/product/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm này");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
