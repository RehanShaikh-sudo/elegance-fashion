document.getElementById("imageUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("image").value = reader.result;
      console.log("Image base64 loaded");
    };
    reader.readAsDataURL(this.files[0]);
  });
  
  document.getElementById("product-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const price = parseInt(document.getElementById("price").value);
    const description = document.getElementById("description").value.trim();
    const stock = parseInt(document.getElementById("stock").value);
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;
  
    console.log({ name, price, description, stock, image, category });
  
    if (!name || !price || !description || !stock || !image || !category) {
      alert("Please fill in all fields including image.");
      return;
    }
  
    fetch("https://rayer.great-site.net/add_product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, stock, image, category }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
        if (data.success) {
          alert("✅ Product added successfully!");
          this.reset(); // clear the form
          document.getElementById("image").value = ""; // clear hidden image input
        } else {
          alert("❌ Error adding product: " + data.error);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("❌ Something went wrong.");
      });
  });
  