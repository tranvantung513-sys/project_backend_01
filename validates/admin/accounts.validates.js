module.exports.createPost = (req, res, next) => {
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

module.exports.editPatch = (req, res, next) => {
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

  next();
};
