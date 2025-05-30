var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var boxElement;
var row = document.getElementById("row");
var products = [];

// local strorage get
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}

// add
function addProduct() {
  var product = {
    pName: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDescription.value,
    imgName: productImage.files[0]?.name,
  };

  products.unshift(product);
  localStorage.setItem("products", JSON.stringify(products));
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
  productImage.value = null;
}

// display
function displayProduct() {
  var cartona = ``;

  for (var i = 0; i < products.length; i++) {
    cartona += `<div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
            <div class="product bg-light p-3 rounded">
              <div class="product-image d-flex justify-content-center align-content-center">
                <img class="w-50 d-flex" src="./images/Products/${products[i].imgName}" alt="" />
              </div>
              <div class="product-body">
                <h2 class="h3">Name: <span>${products[i].pName}</span></h2>
                <h2 class="h3">Price: <span>${products[i].price}</span></h2>
                <h3 class="h4">Category: <span>${products[i].category}</span></h3>
                <p class="lead"><span>Description:</span>${products[i].desc}</p>
                <div class="product-btns">
                  <button onclick="getFormToUpdate(${i})" class="btn btn-outline-warning my-2">
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

// get data to the form
function getFormToUpdate(elementIndex) {
  boxElement = elementIndex;
  productName.value = products[elementIndex].pName;
  productPrice.value = products[elementIndex].price;
  productCategory.value = products[elementIndex].category;
  productDescription.value = products[elementIndex].desc;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

// update
function productUpdate() {
  products[boxElement].pName = productName.value;
  products[boxElement].price = productPrice.value;
  products[boxElement].category = productCategory.value;
  products[boxElement].desc = productDescription.value;

  if (productImage.files[0]) {
    products[boxElement].imgName = productImage.files[0].name;
  }

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");

  localStorage.setItem("products", JSON.stringify(products));

  displayProduct();
  cleanInputs();
}


// delete
function deleteProduct(elementIndex) {
  products.splice(elementIndex, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct();
}
