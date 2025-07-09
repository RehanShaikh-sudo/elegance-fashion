fetch("https://rayer.great-site.net/get_products.php")
  .then((res) => res.json())
  .then((products) => {
    const menSection = document.querySelector("#men .product-grid");
    const womenSection = document.querySelector("#women .product-grid");
    const kidsSection = document.querySelector("#kids .product-grid");

    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <p style="font-size: 14px; color: #777;">${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

      if (product.category === "Men") menSection?.appendChild(div);
      else if (product.category === "Women") womenSection?.appendChild(div);
      else if (product.category === "Kids") kidsSection?.appendChild(div);
    });
  })
  .catch((err) => console.error("Error loading products:", err));
