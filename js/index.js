var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var searchInput = document.getElementById("searchInput");
var boxElement;
var row = document.getElementById("row");
var products = [];

// local strorage get
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct(products);
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
  cleanInputs();
  displayProduct(products);
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
function displayProduct(displayedArr) {
  var cartona = ``;

  for (var i = 0; i < displayedArr.length; i++) {
    cartona += `<div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
            <div class="product bg-light p-3 rounded">
              <div class="product-image">
                <img class="" src="./images/Products/${displayedArr[i].imgName}" alt="" />
              </div>
              <div class="product-body">
                <h2 class="h3">Name: <span>${displayedArr[i].pName}</span></h2>
                <h2 class="h3">Price: <span>${displayedArr[i].price}</span></h2>
                <h3 class="h4">Category: <span>${displayedArr[i].category}</span></h3>
                <p class="lead"><span>Description:</span>${displayedArr[i].desc}</p>
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

  displayProduct(products);
  cleanInputs();
}

// delete
function deleteProduct(elementIndex) {
  products.splice(elementIndex, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct(products);
}

// search
function searchProduct(searchKey) {
  var result = [];

  for (var i = 0; i < products.length; i++) {
    if (
      products[i].pName.toLowerCase().includes(searchKey.toLowerCase().trim())
    ) {
      result.push(products[i]);
    }
  }

  displayProduct(result);
}
