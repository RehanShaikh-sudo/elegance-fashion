const defaultProducts = []; // <-- remove or leave empty now
const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
const products = [...adminProducts.map((p, i) => ({
  id: 1000 + i,
  name: p.name,
  price: p.price,
  image: p.image
}))];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function findProductById(id) {
  return products.find(p => p.id === id);
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalPriceElem = document.getElementById("total-price");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElem.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    const product = findProductById(item.id);
    const itemTotal = product.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-card-details">
        <h4>${product.name}</h4>
        <p>Price: ₹${product.price}</p>
        <p>Quantity: ${item.qty}</p>
        <p>Total: ₹${itemTotal}</p>
      </div>
      <div class="cart-card-actions">
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
        <button onclick="removeItem(${index})" style="background:#dc3545;">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalPriceElem.innerText = total;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
