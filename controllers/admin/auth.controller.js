const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");

// [get] /admin/auth/login

module.exports.login = (req, res) => {
  res.render("admin/page/auth/login", {
    pageTitle: "Trang Đăng nhập",
  });
};

// [post] /admin/auth/login

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  if (md5(password) != user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  if (user.status != "active") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
