document.addEventListener("DOMContentLoaded", function () {
    const addButtonElements = document.querySelectorAll("[class^='AddItem']"); // Select all elements with class starting with "AddItem"
    const itemCountElement = document.getElementById("itemCount");
    const cartElement = document.getElementById("cart");
    const cartItemsElement = document.getElementById("cartItems");

    let itemCount = 0;

    // Function to add an item to the cart
    function addToCart(itemName, size) {
        const li = document.createElement("li");
        li.textContent = `${itemName} (Size: ${size})`;

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash deleteIcon";
        deleteIcon.addEventListener("click", function () {
            li.remove(); // Remove the item when the delete icon is clicked
            itemCount--; // Decrease the item count
            itemCountElement.textContent = itemCount; // Update the item count element
        });

        li.appendChild(deleteIcon);
        cartItemsElement.appendChild(li);

        itemCount++; // Increase the item count
        itemCountElement.textContent = itemCount; // Update the item count element
    }

    // Add click event listeners to all AddItem buttons
    addButtonElements.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Extract item name from the corresponding TextItemX element
            const textItemElement = document.querySelector(`.TextItem${index + 1}`);
            const itemName = textItemElement.textContent;

            // Extract selected size from the clicked size button
            const sizeButtons = document.querySelectorAll(`.Item${index + 1} .SizeButtons button`);
            let selectedSize = "";
            sizeButtons.forEach((sizeButton) => {
                if (sizeButton.classList.contains("selected")) {
                    selectedSize = sizeButton.getAttribute("data-size");
                }
            });

            if (selectedSize) {
                addToCart(itemName, selectedSize); // Add the item with the selected size to the cart
            } else {
                alert("Please select a size.");
            }
        });
    });

    // Handle size button clicks to highlight the selected size
    const sizeButtons = document.querySelectorAll(".Size");
    sizeButtons.forEach((sizeButton) => {
        sizeButton.addEventListener("click", function () {
            // Remove the "selected" class from all size buttons within the same item
            const parentItem = this.closest(".Items > div");
            const itemSizeButtons = parentItem.querySelectorAll(".Size");
            itemSizeButtons.forEach((itemSizeButton) => {
                itemSizeButton.classList.remove("selected");
            });

            // Add the "selected" class to the clicked size button
            this.classList.add("selected");
        });
    });

    const searchBar = document.querySelector(".Bar");
    const items = document.querySelectorAll(".Items > div"); // Select all item containers

    searchBar.addEventListener("input", function () {
        const searchQuery = searchBar.value.toLowerCase();

        items.forEach(function (item) {
            const itemText = item.querySelector("h4").textContent.toLowerCase();

            if (itemText.includes(searchQuery)) {
                item.style.display = "flex"; // Show matching items
            } else {
                item.style.display = "none"; // Hide non-matching items
            }
        });
    });

    searchBar.addEventListener("focus", function () {
        searchBar.placeholder = ""; // Remove the placeholder text on focus
    });

    searchBar.addEventListener("blur", function () {
        searchBar.placeholder = "Search Here"; // Restore placeholder text on blur
    });

    // Handle "Edit" button click to show/hide the cart
    const editButton = document.getElementById("editButton");
    editButton.addEventListener("click", function () {
        if (cartElement.style.display === "none" || cartElement.style.display === "") {
            cartElement.style.display = "block";
        } else {
            cartElement.style.display = "none";
        }
    });
});