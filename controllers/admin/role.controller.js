const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [get] /admin/dashboard

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/page/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/page/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const data = await Role.findOne(find);
    console.log(data);
    res.render("admin/page/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    res.flash("Cập nhật nhóm quyền thành công");
  } catch (error) {
    res.flash("Cập nhật nhóm quyền thất bại");
  }

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const record = await Role.find(find);

  res.render("admin/page/roles/permissions", {
    pageTitle: "Phân quyền",
    record: record,
  });
};

module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
  req.flash("success", "Cập nhật phân quyền thành công");
  res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
};
