const add_button = document.getElementsByClassName("add-btn");
const add_qty = document.getElementsByClassName("add-qty");
let count = 0;
let products = [];
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
      let add_qty = document.getElementById(`qty-${product_id}`);
      add_qty.classList.remove("hidden");
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
    if (item.quantity === 0) {
      let add_qty = document.getElementById(`qty-${item.product_id}`);
      add_qty.classList.add("hidden");
      let findIndex = products.indexOf(item);
      products.splice(findIndex, 1);
      let button = document.getElementById(`button-${item.product_id}`);
      button.classList.remove("hidden");
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
      li.innerHTML = `<div class="flex flex-row justify-between items-center  w-full relative mt-5">
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

function confirm() {
  const confirm = document.getElementById("order-confirm");
  const orderModel = document.getElementById("order-model");
  const orderList = document.getElementById("modal-order-list");
  const total_price = document.getElementById("total");
  let total = 0;
  confirm.onclick = () => {
    orderModel.classList.remove("hidden");
    orderList.innerHTML = "";
    products.forEach((product) => {
      total = total + product.total_price;
      let li = document.createElement("li");
      li.innerHTML = `
        <div class="flex flex-row justify-between">
          <div>
            <h1>${product.product}</h1>
            <span>${product.quantity}x</span>
            <span>@${product.price}</span>
          </div>
          <h1>$${product.total_price}</h1>
       </div>
     `;
      orderList.appendChild(li);
    });
    total_price.innerText = total;
  };
}

function newOrder() {
  const orderModel = document.getElementById("order-model");
  const starOrder = document.getElementById("new-order");
  starOrder.onclick = () => {
    orderModel.classList.add("hidden");
    products.forEach((product) => {
      let add_id = `add-${product.product_id}`;
      let increase = document.getElementById(add_id);
      increase.previousElementSibling.innerText = 0;
    });
    products = [];
    count = 0;
    for (let btn of add_button) {
      btn.classList.remove("hidden");
    }
    for (let button of add_qty) {
      button.classList.add("hidden");
    }
    renderProducts();
  };
}

function deleteOrder(id) {
  products.forEach((product) => {
    if (id === Number(product.product_id)) {
      count = count - product.quantity;
      let item_count = document.getElementById("order");
      let add_id = `add-${product.product_id}`;
      let increase = document.getElementById(add_id);
      increase.previousElementSibling.innerText = 0;
      let add_qty = document.getElementById(`qty-${product.product_id}`);
      add_qty.classList.add("hidden");
      let button = document.getElementById(`button-${id}`);
      button.classList.remove("hidden");
      item_count.innerText = count;
      let deleteIndex = products.indexOf(product);
      products.splice(deleteIndex, 1);
      renderProducts();
      return;
    }
  });
}

add_product();
confirm();
newOrder();
