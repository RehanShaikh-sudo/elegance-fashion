function fetchAdminProducts() {
  fetch("https://yourdomain.epizy.com/get_products.php")
    .then(res => res.json())
    .then(data => {
      renderAdminProducts(data);
    });
}

function renderAdminProducts(products) {
  const container = document.getElementById("admin-products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p style="font-size: 14px; color: #777;">${product.category}</p>
      <p style="font-size: 14px;">Stock: ${product.stock}</p>
      <p style="font-size: 14px; color: #444;">${product.description}</p>
    `;
    container.appendChild(div);
  });
}

document.getElementById("imageUpload").addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("image").value = reader.result;
  };
  reader.readAsDataURL(this.files[0]);
});

document.getElementById("product-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = parseInt(document.getElementById("price").value);
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value.trim();
  const stock = parseInt(document.getElementById("stock").value);
  const category = document.getElementById("category").value;

  if (name && price && image && description && category && stock >= 0) {
    const newProduct = { name, price, image, category, description, stock };

    fetch("https://yourdomain.epizy.com/add_product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Product added!");
          this.reset();
          fetchAdminProducts();
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Server error");
      });
  }
});

fetchAdminProducts();
