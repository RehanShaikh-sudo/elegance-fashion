document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.removeItem("cart");
  window.location.href = "order-success.html";
});
