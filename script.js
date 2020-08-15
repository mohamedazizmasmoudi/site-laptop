var tabs = document.querySelectorAll(".tabs_wrap ul li");
var gamers = document.querySelectorAll(".gamer");
var pros = document.querySelectorAll(".pro");
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

		if(tabval == "gamer"){
			gamers.forEach((gamer)=>{
				gamer.style.display = "block";
			})
		}
		else if(tabval == "pro"){
			pros.forEach((pro)=>{
				pro.style.display = "block";
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
    products[i].style.width = "30%";
  }
}


