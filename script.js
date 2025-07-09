function getAdminProducts() {
  const admin = JSON.parse(localStorage.getItem("adminProducts")) || [];
  return admin.map((p, index) => ({
    id: 1000 + index,
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category || ""
  }));
}

function getAllProducts() {
  return getAdminProducts();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const span = document.getElementById("cart-count");
  if (span) span.innerText = cartCount;
}

function renderProductsByCategory() {
  const all = getAllProducts();

  const men = all.filter(p => p.category === "Men");
  const women = all.filter(p => p.category === "Women");
  const kids = all.filter(p => p.category === "Kids");

  renderSection(men, "men-products");
  renderSection(women, "women-products");
  renderSection(kids, "kids-products");

  setCart(getCart());
}

function renderSection(products, sectionId) {
  const container = document.getElementById(sectionId);
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products in this category yet.</p>";
    return;
  }
  function fetchAndRenderProducts() {
    fetch("https://yourdomain.epizy.com/get_products.php")
      .then(res => res.json())
      .then(allProducts => {
        const men = allProducts.filter(p => p.category === "Men");
        const women = allProducts.filter(p => p.category === "Women");
        const kids = allProducts.filter(p => p.category === "Kids");
  
        renderSection(men, "men-products");
        renderSection(women, "women-products");
        renderSection(kids, "kids-products");
      })
      .catch(err => {
        console.error("Failed to load products", err);
      });
  }  

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
  <img src="${product.image}" alt="${product.name}" />
  <h3>${product.name}</h3>
  <p>₹${product.price}</p>
  <p style="font-size: 14px; color: #666;">${product.description}</p>
  <p style="font-size: 14px;">Stock: ${product.stock}</p>
  <button onclick="addToCart(${product.id})">Add to Cart</button>
`;

    container.appendChild(div);
  });
}


function addToCart(id) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  setCart(cart);
  alert("Added to cart!");
}

window.onload = fetchAndRenderProducts;