var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");

var row = document.getElementById("row");
var products = [];

// add
function addProduct() {
  var product = {
    pName: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDescription.value,
  };

  products.unshift(product);
  console.log(products);

  cleanInputs();

  displayProduct();
}

// clear inputs
function cleanInputs() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
}

// display
function displayProduct() {
  var cartona = ``;

  for (var i = 0; i < products.length; i++) {
    cartona += `<div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
            <div class="product bg-light p-3 rounded">
              <div class="product-image">
                <img src="" alt="" />
              </div>
              <div class="product-body">
                <h2 class="h3">Name: <span>${products[i].pName}</span></h2>
                <h2 class="h3">Price: <span>${products[i].price}</span></h2>
                <h3 class="h4">Category: <span>${products[i].category}</span></h3>
                <p class="lead"><span>Description:</span>${products[i].desc}</p>
                <div class="product-btns">
                  <button class="btn btn-outline-warning my-2">
                    Update Product 🪶
                  </button>
                  <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-2">
                    Delete Product 🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>`;
  }

  console.log(cartona);

  row.innerHTML = cartona;
}

// delete
function deleteProduct(elementIndex) {
  products.splice(elementIndex, 1);
  displayProduct();
}
