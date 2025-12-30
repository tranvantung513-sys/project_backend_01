const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const ProductsHelper = require("../../helpers/product");
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product_id = item.product_id;
      const productInfo = await Product.findOne({
        _id: product_id,
      }).select("title thumbnail slug price discountPercentage");

      productInfo.priceNew = ProductsHelper.priceNewProduct(productInfo);

      item.productInfo = productInfo;
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }

  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.quantity * item.totalPrice,
    0
  );
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
};

module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  const product = await Product.findById(productId);
  // console.log(productId);
  // console.log(quantity);
  // console.log(cartId);

  const cart = await Cart.findOne({
    _id: cartId,
  });
  const exitsProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );

  if (exitsProductInCart) {
    const quantityNew = quantity + exitsProductInCart.quantity;

    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": quantityNew,
        },
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: objectCart },
      }
    );
  }

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
  res.redirect(`/products/detail/${product.slug}`);
};

module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { product_id: productId } },
    }
  );
  req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng");
  res.redirect("/cart");
};

module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  console.log(req.params);
  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );
  // req.flash("success", "Cập nhật thành công");
  res.redirect("/cart");
};
