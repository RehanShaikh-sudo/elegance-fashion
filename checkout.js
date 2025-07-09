document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.removeItem("cart");
    window.location.href = "order-success.html";
  });
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
const products = JSON.parse(localStorage.getItem("adminProducts")) || [];

function findProductById(id) {
  return products.find((p, i) => 1000 + i === id);
}

function renderSummary() {
  const section = document.getElementById("order-summary");
  let total = 0;

  section.innerHTML = "<h3>Order Summary</h3>";

  cart.forEach(item => {
    const product = findProductById(item.id);
    const subtotal = product.price * item.qty;
    total += subtotal;
    section.innerHTML += `
      <p>${product.name} × ${item.qty} = ₹${subtotal}</p>
    `;
  });

  section.innerHTML += `<h4>Total: ₹${total}</h4>`;
}

renderSummary();
