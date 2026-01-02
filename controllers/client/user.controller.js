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
