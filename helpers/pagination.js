module.exports = (ObjectPagination, query, countProduct) => {
  if (query.page) {
    ObjectPagination.currentPage = parseInt(query.page);
  }
  ObjectPagination.skip =
    (ObjectPagination.currentPage - 1) * ObjectPagination.limitItems;

  const totalPage = Math.ceil(countProduct / ObjectPagination.limitItems);
  ObjectPagination.totalPage = totalPage;
  return ObjectPagination;
};
