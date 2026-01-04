module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập  Họ tên!`);
    res.redirect("/admin/products/create");
    return;
  }
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập  Email!`);
    res.redirect("/admin/products/create");
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập  Password!`);
    res.redirect("/admin/products/create");
    return;
  }

  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập  Email!`);
    res.redirect("/admin/products/create");
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập  Password!`);
    res.redirect("/admin/products/create");
    return;
  }

  next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập  Email!`);
    res.redirect("/admin/products/create");
    return;
  }

  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập  Password!`);
    res.redirect("/user/password/reset");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", `Vui lòng xác nhận mật khẩu!`);
    res.redirect("/user/password/reset");
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", `Mật khẩu không khớp`);
    res.redirect("/user/password/reset");
    return;
  }
  next();
};
