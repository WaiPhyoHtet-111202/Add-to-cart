const add_button = document.getElementsByClassName("add-btn");
let count = 0;
let products = [];
let qty_button = null;
let total = 0;
const empty_cart = document.getElementById("empty");
const cart_list = document.getElementById("cart");
const orderConfirm = document.getElementById("order-list");
cart_list.classList.add("hidden");

function add_product() {
  for (let btn of add_button) {
    btn.onclick = function () {
      btn.classList.add("hidden");
      let product_id = btn.getAttribute("data-id");
      let product_name = btn.getAttribute("data-product");
      let price = Number(btn.getAttribute("data-price"));
      let item_count_display = document.getElementById("order");
      let product_data = {
        product_id,
        product: product_name,
        price: price,
        quantity: 1,
        total_price: price,
      };
      products.push(product_data);

      quantityControls(product_id);

      count++;
      item_count_display.innerText = count;
      renderProducts();
    };
  }
}

function quantityControls(product_id) {
  let increase = document.getElementById(`add-${product_id}`);
  let decrease = document.getElementById(`minus-${product_id}`);

  increase.onclick = () => {
    let item = products.find((p) => p.product_id === product_id);
    item.quantity++;
    item.total_price = item.quantity * item.price;
    count++;
    document.getElementById("order").innerText = count;
    increase.previousElementSibling.innerText = item.quantity;
    renderProducts();
  };

  decrease.onclick = () => {
    let item = products.find((p) => p.product_id === product_id);
    if (item.quantity > 0) {
      item.quantity--;
      item.total_price = item.quantity * item.price;
      count--;
      document.getElementById("order").innerText = count;
      decrease.nextElementSibling.innerText = item.quantity;
      renderProducts();
    }
  };
}

function renderProducts() {
  const menu_list = document.getElementById("menu-list");
  const li = document.createElement("li");
  if (count > 0) {
    empty_cart.classList.add("hidden");
    cart_list.classList.remove("hidden");
    const menu_list = document.getElementById("menu-list");
    let item_count = document.getElementById("order");
    item_count.innerText = count;
    menu_list.innerHTML = "";
    products.forEach((product) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <div class="flex flex-row justify-between items-center  w-full relative mt-5">
        <h1>${product.product}</h1> 
      <button onclick="deleteOrder(${product.product_id})" class="absolute right-5">
            <i class="fa-regular fa-circle-xmark fa-2x"></i>
        </button>
      </div>
        <span class="text-red-500">${product.quantity}x</span>
        <span>$${product.price}</span> 
        <span>$${product.total_price}</span>  
        
      `;
      menu_list.appendChild(li);
    });
    let total = products.reduce((sum, product) => {
      return sum + parseFloat(product.total_price);
    }, 0);
    document.getElementById("order-total").innerText = `$${total}`;
  } else {
    document.getElementById("order").innerText = 0;
    cart_list.classList.add("hidden");
    empty_cart.classList.remove("hidden");
  }
}

// function orderConfirm() {
//   const confirm = document.getElementById("order-confirm");
//   confirm.addEventListener("click", () => {
//     products = [];
//     renderProducts();
//   });
// }

function deleteOrder(id) {
  products.forEach((product) => {
    if (id === Number(product.product_id)) {
      count = count - product.quantity;
      let item_count = document.getElementById("order");
      let deleteIndex = products.indexOf(product);
      let add_id = `add-${product.product_id}`;
      let increase = document.getElementById(add_id);
      increase.previousElementSibling.innerText = 0;
      let originalAddBtn = document.querySelector(`[data-id="${id}"]`);
      if (originalAddBtn) {
        originalAddBtn.classList.remove("hidden");
      }
      item_count.innerText = count;
      product.quantity = 0;
      products.splice(deleteIndex, 1);
      renderProducts();
      return;
    }
  });
}

add_product();
