var tabs = document.querySelectorAll(".tabs_wrap ul li");
var males = document.querySelectorAll(".male");
var females = document.querySelectorAll(".female");
var all = document.querySelectorAll(".item_wrap");

tabs.forEach((tab)=>{
	tab.addEventListener("click", ()=>{
		tabs.forEach((tab)=>{
			tab.classList.remove("active");
		})
		tab.classList.add("active");
		var tabval = tab.getAttribute("data-tabs");

		all.forEach((item)=>{
			item.style.display = "none";
		})

		if(tabval == "male"){
			males.forEach((male)=>{
				male.style.display = "block";
			})
		}
		else if(tabval == "female"){
			females.forEach((female)=>{
				female.style.display = "block";
			})
		}
		else{
			all.forEach((item)=>{
				item.style.display = "block";
			})
		}

	})
})


var products = document.getElementsByClassName("product");
var totalSum = 0;
var productsQte = [];
var wishlist = [];
var productsPrices = [];
var numberProducts = 0; //is the number of different products
var numberArticles = 0; //is the total articles number
var myTable = document.getElementById("myTable");
var empty = 1; //the cart is empty

document.getElementsByTagName("body").onload = function () {
  loading();
};

function loading() {
  for (i = 0; i < products.length; i++) {
    productsQte[i] = 0;
    wishlist[i] = "";
    let id = i + 1;
    var prodPriceString = document.querySelector(
      "#prod" + id + " .description .price"
    ).innerHTML;
    productsPrices[i] = parseInt(
      prodPriceString.substring(0, prodPriceString.length - 2)
    );
  }
}

function displayOne() {
  for (i = 0; i < products.length; i++) {
    products[i].style.width = "50%";
  }
}

function displayTwo() {
  for (i = 0; i < products.length; i++) {
    products[i].style.width = "40%";
  }
}

function displayThree() {
  for (i = 0; i < products.length; i++) {
    products[i].style.width = "25%";
  }
}

/********************************-----------EMPTY CART-----------*************************************/

function emptyCart() {
  if (numberProducts > 0) {
    totalSum = 0;
    document.getElementById("totalSum").innerHTML = totalSum + "DT";

    for (i = 0; i < productsQte.length; i++) {
      productsQte[i] = 0;
    }
    for (i = 1; i <= numberProducts; i++) {
      myTable.deleteRow(1);
    }

    var initialRow = myTable.insertRow(1);
    var initialValue1 = document.createElement("TD");
    var initialValue2 = document.createElement("TD");
    var initialValue3 = document.createElement("TD");
    var initialValue4 = document.createElement("TD");
    var initialValue5 = document.createElement("TD");

    initialValue1.innerHTML = "-";
    initialValue2.innerHTML = "-";
    initialValue3.innerHTML = "-";
    initialValue4.innerHTML = "-";

    initialRow.appendChild(initialValue1);
    initialRow.appendChild(initialValue2);
    initialRow.appendChild(initialValue3);
    initialRow.appendChild(initialValue4);
    initialRow.appendChild(initialValue5);

    numberProducts = 0;
    numberArticles = 0; //the cart is now empty
  }
}
function removeFromCart(prodID) {
  if (numberProducts > 1) {
    var myRow = document.getElementById("prodRow" + prodID);
    myRow.remove();
    totalSum -= productsQte[prodID - 1] * productsPrices[prodID - 1];
    document.getElementById("totalSum").innerHTML = totalSum + "DT";
    numberArticles -= productsQte[prodID - 1];
    numberProducts -= 1;
  } else emptyCart();
}

/***********************************-----------BUY-----------*****************************************/

function buy(prodID) {
  if (numberProducts == 0) myTable.deleteRow(1); //  if the cart is initially empty, delete the initial row

  productsQte[prodID - 1] += 1;
  var prodPrice = productsPrices[prodID - 1];

  totalSum += prodPrice;
  document.getElementById("totalSum").innerHTML = totalSum + "DT";

  var prodName = document.querySelector(
    "#prod" + prodID + " .description .name"
  ).innerHTML;
  var prodPriceString = document.querySelector(
    "#prod" + prodID + " .description .price"
  ).innerHTML;
  numberArticles += 1;

  if (productsQte[prodID - 1] == 1) {
    numberProducts += 1;
    var minus = document.createElement("BUTTON");
    minus.setAttribute("class", "minus");
    minus.setAttribute("id", "minus" + prodID);
    minus.setAttribute("onclick", "minusQuantity(" + prodID + ")");
    minus.setAttribute("style", "width:20px;");
    minus.innerHTML = "-";
    var plus = document.createElement("BUTTON");
    plus.setAttribute("class", "plus");
    plus.setAttribute("id", "plus" + prodID);
    plus.setAttribute("onclick", "plusQuantity(" + prodID + ")");
    plus.setAttribute("style", "width:20px;");
    plus.innerHTML = "+";

    var newRow = myTable.insertRow(1);
    newRow.setAttribute("id", "prodRow" + prodID);
    newRow.setAttribute("class", "row");

    var productTD = document.createElement("TD");
    var productText = document.createTextNode(prodName);
    productTD.appendChild(productText);
    newRow.appendChild(productTD);

    var unitPriceTD = document.createElement("TD");
    var unitPriceText = document.createTextNode(prodPriceString);
    unitPriceTD.appendChild(unitPriceText);
    newRow.appendChild(unitPriceTD);

    /***********-----Quantity------*********/
    var quantityTD = document.createElement("TD");

    var quantityText = document.createElement("P");
    quantityText.innerHTML = "1";
    quantityText.style.margin = "0px";
    quantityText.style.marginLeft = "10px";
    quantityText.style.marginRight = "10px";
    quantityText.style.display = "inline";

    quantityTD.appendChild(minus);

    quantityTD.appendChild(quantityText);

    quantityTD.appendChild(plus);

    quantityTD.style.height = "30px";

    newRow.appendChild(quantityTD);

    var totalPriceTD = document.createElement("TD");
    var totalPriceText = document.createTextNode(prodPrice + "DT");
    totalPriceTD.appendChild(totalPriceText);
    newRow.appendChild(totalPriceTD);

    var removeFromCart = document.createElement("TD");
    var removeIcon = document.createElement("IMG");
    removeIcon.setAttribute("src", "images/return.png");
    removeIcon.setAttribute("onclick", "removeFromCart(" + prodID + ")");
    removeIcon.style.width = "25px";
    removeFromCart.appendChild(removeIcon);
    newRow.appendChild(removeFromCart);
  } else if (productsQte[prodID - 1] > 1) {
    var columns = document.getElementById("prodRow" + prodID).children;
    columns[2].children[1].innerHTML = productsQte[prodID - 1];
    columns[3].innerHTML = productsQte[prodID - 1] * prodPrice + "DT";
  }
}

/*****************************************************************************************/

function plusQuantity(prodID) {
  buy(prodID);
}

function minusQuantity(prodID) {
  if (productsQte[prodID - 1] == 1) {
  } else {
    var myRow = document.getElementById("prodRow" + prodID);
    productsQte[prodID - 1] -= 1;

    var prodPrice = productsPrices[prodID - 1];
    totalSum -= prodPrice;
    document.getElementById("totalSum").innerHTML = totalSum + "DT";
    numberArticles -= 1;
    var columns = myRow.children;
    columns[2].children[1].innerHTML = productsQte[prodID - 1];
    columns[3].innerHTML = productsQte[prodID - 1] * prodPrice + "DT";
  }
}

function addToWishlist(prodID) {
  wishlist[prodID - 1] = "*";
}

function removeFromWishlist(prodID) {
  wishlist[prodID - 1] = "";
}

function emptyWishlist() {
  for (i = 0; i < wishlist.length; i++) {
    wishlist[i] = "";
  }
}

/************************------CART-MODAL-------*********************************/
function showCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "block";
}

function closeCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

/***************-----------CLOSE MODAL by window.onclick-----------*****************/
window.onclick = function (event) {
  var cartModal = document.getElementById("cart-modal");
  var wishlistModal = document.getElementById("wishlist-modal");
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  } else wishlistModal.style.display = "none";
};
/************************------WISHLIST-MODAL-------*********************************/

function showWishlist() {
   var modal = document.getElementById("wishlist-modal");
     modal.style.display = "block";
  
  console.log('kgxjg')
}

function closeWishlist() {
  var modal = document.getElementById("wishlist-modal");
  modal.style.display = "none";
}

/*function minusQuantity(prodID) {
    var myRow = document.getElementById("prodRow" + prodID);
    productsQte[prodID - 1] -= 1;

    var prodPrice = productsPrices[prodID - 1];
    totalSum -= prodPrice;
    document.getElementById("totalSum").innerHTML = (totalSum + "DT");


   if (numberArticles == 1) {
        emptyCart();
    }


    else if (productsQte[prodID - 1] == 0 && numberArticles > 0) {
        myRow.remove();
        numberArticles -= 1;
        numberProducts-=1;
    }

    else {
        numberArticles -= 1
        var columns = myRow.children;
        (columns[2].children)[1].innerHTML = productsQte[prodID - 1];
        columns[3].innerHTML = productsQte[prodID - 1] * prodPrice + "DT";
    }

}*/
