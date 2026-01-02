const md5 = require("md5");
const User = require("../../models/user.model");
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const existEmail = await User.findOne({
    email: req.body.email,
  });
  if (existEmail) {
    res.flash("error", "Email đã tồn tại");
    res.redirect("/user/register");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    req.redirect("/user/login");
    return;
  }
  if (!md5(password) == user.password) {
    req.flash("error", "Sai mật khẩu");
    req.redirect("/user/login");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa");
    req.redirect("/user/login");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
