const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
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

    console.log(quantityNew);

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
