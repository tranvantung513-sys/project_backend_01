const systemConfig = require("../../config/system");
const md5 = require("md5");
const Account = require("../../models/accounts.model");
module.exports.index = async (req, res) => {
  res.render("admin/page/my-account/index", {
    pageTitle: "Thông tin cá nhân",
  });
};

module.exports.edit = async (req, res) => {
  res.render("admin/page/my-account/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExits = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExits) {
    req.flash("error", "Email đã tồn tại");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  await Account.updateOne({ _id: id }, req.body);
  req.flash("success", "Cập nhật tài khoản thành công");
  res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
};
