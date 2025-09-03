// --------- LOGIN ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = "/dashboard.html";
    } else {
      document.getElementById("loginMessage").textContent = "Invalid login.";
    }
  });
}

// --------- LOGOUT ----------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login.html";
  });
}

// --------- PRODUCTS ----------
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

if (productForm) {
  loadProducts();

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    if (id) {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
    }

    productForm.reset();
    loadProducts();
  });
}

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  const tbody = productTable.querySelector("tbody");
  tbody.innerHTML = "";
  products.forEach((p) => {
    const row = `<tr>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td><button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">Edit</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function editProduct(id, name, price) {
  document.getElementById("productId").value = id;
  document.getElementById("productName").value = name;
  document.getElementById("productPrice").value = price;
}

// --------- CUSTOMERS ----------
const customerForm = document.getElementById("customerForm");
const customerTable = document.getElementById("customerTable");

if (customerForm) {
  loadCustomers();

  customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("customerId").value;
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;

    if (id) {
      await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    } else {
      await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    }

    customerForm.reset();
    loadCustomers();
  });
}

async function loadCustomers() {
  const res = await fetch("/api/customers");
  const customers = await res.json();
  const tbody = customerTable.querySelector("tbody");
  tbody.innerHTML = "";
  customers.forEach((c) => {
    const row = `<tr>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td><button onclick="editCustomer(${c.id}, '${c.name}', '${c.email}')">Edit</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function editCustomer(id, name, email) {
  document.getElementById("customerId").value = id;
  document.getElementById("customerName").value = name;
  document.getElementById("customerEmail").value = email;
}
