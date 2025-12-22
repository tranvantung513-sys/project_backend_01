const Account = require("../../models/accounts.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }

  res.render("admin/page/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/page/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

module.exports.createPost = async (req, res) => {
  const emailExits = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExits) {
    req.flash("error", "Email đã tồn tại");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);

    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
