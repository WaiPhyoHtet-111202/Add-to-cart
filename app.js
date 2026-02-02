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
    btn.addEventListener("click", addProduct);
    function addProduct() {
      // btn.classList.add("hidden");
      let product = btn.getAttribute("data-product");
      let price = btn.getAttribute("data-price");
      let product_id = btn.getAttribute("data-id");
      let item_count = document.getElementById("order");
      qty_button = btn.getAttribute("data-button");
      let product_data = {
        product_id,
        product,
        price,
        quantity: 1,
        total_price: price,
      };
      count++;
      item_count.innerText = count;
      let add_id = `add-${product_id}`;
      let minus_id = `minus-${product_id}`;
      let increase = document.getElementById(add_id);
      let decrease = document.getElementById(minus_id);
      increase.addEventListener("click", () => {
        for (product of products) {
          if (product_data.product_id === product.product_id) {
            product.quantity++;
            count++;
            console.log(product);
            increase.previousElementSibling.innerText = product.quantity;
            product.total_price = String(product.quantity * product.price);
            renderProducts();
            return;
          }
        }
      });
      decrease.addEventListener("click", () => {
        products.forEach((product) => {
          if (product.product_id === product_data.product_id) {
            if (product.quantity === 0) {
              alert("Item can't be less than zero");
              return;
            }
            product.quantity--;
            count--;
            decrease.nextElementSibling.innerText = product.quantity;
            product.total_price = String(product.total_price - product.price);
            renderProducts();
            return;
          }
        });
      });
      products.push(product_data);
      console.log(products);
      renderProducts();
      return;
    }
  }
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
      item_count.innerText = count;
      product.quantity = 0;
      products.splice(deleteIndex, 1);
      renderProducts();
      return;
    }
  });
}

add_product();
