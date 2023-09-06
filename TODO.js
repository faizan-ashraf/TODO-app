document.addEventListener("DOMContentLoaded", function () {
    const addButtonElements = document.querySelectorAll("[class^='AddItem']"); 
    const itemCountElement = document.getElementById("itemCount");
    const cartElement = document.getElementById("cart");
    const cartItemsElement = document.getElementById("cartItems");

    let itemCount = 0;

    function addToCart(itemName, size) {
        const li = document.createElement("li");
        li.textContent = `${itemName} (Size: ${size})`;

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash deleteIcon";
        deleteIcon.addEventListener("click", function () {
            li.remove(); 
            itemCount--;
            itemCountElement.textContent = itemCount; 
        });

        li.appendChild(deleteIcon);
        cartItemsElement.appendChild(li);

        itemCount++; 
        itemCountElement.textContent = itemCount; 
    }


    addButtonElements.forEach((button, index) => {
        button.addEventListener("click", function () {
           
            const textItemElement = document.querySelector(`.TextItem${index + 1}`);
            const itemName = textItemElement.textContent;

            
            const sizeButtons = document.querySelectorAll(`.Item${index + 1} .SizeButtons button`);
            let selectedSize = "";
            sizeButtons.forEach((sizeButton) => {
                if (sizeButton.classList.contains("selected")) {
                    selectedSize = sizeButton.getAttribute("data-size");
                }
            });

            if (selectedSize) {
                addToCart(itemName, selectedSize); 
            } else {
                alert("Please select a size.");
            }
        });
    });


    const sizeButtons = document.querySelectorAll(".Size");
    sizeButtons.forEach((sizeButton) => {
        sizeButton.addEventListener("click", function () {
            
            const parentItem = this.closest(".Items > div");
            const itemSizeButtons = parentItem.querySelectorAll(".Size");
            itemSizeButtons.forEach((itemSizeButton) => {
                itemSizeButton.classList.remove("selected");
            });

           
            this.classList.add("selected");
        });
    });

    const searchBar = document.querySelector(".Bar");
    const items = document.querySelectorAll(".Items > div");

    searchBar.addEventListener("input", function () {
        const searchQuery = searchBar.value.toLowerCase();

        items.forEach(function (item) {
            const itemText = item.querySelector("h4").textContent.toLowerCase();

            if (itemText.includes(searchQuery)) {
                item.style.display = "flex"; 
            } else {
                item.style.display = "none"; 
            }
        });
    });

    searchBar.addEventListener("focus", function () {
        searchBar.placeholder = ""; 
    });

    searchBar.addEventListener("blur", function () {
        searchBar.placeholder = "Search Here"; 
    });

    
    const editButton = document.getElementById("editButton");
    editButton.addEventListener("click", function () {
        if (cartElement.style.display === "none" || cartElement.style.display === "") {
            cartElement.style.display = "block";
        } else {
            cartElement.style.display = "none";
        }
    });
});