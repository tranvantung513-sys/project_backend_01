// cập nhật lại số lượng sản phẩm trong giỏ hàng
const inputsQuality = document.querySelectorAll("input[name='quantity']");
if (inputsQuality.length > 0) {
  inputsQuality.forEach((input) => {
    input.addEventListener("change", () => {
      const productId = input.getAttribute("product-id");
      const quantity = input.value;
      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
