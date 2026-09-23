// =================================
// PRODUCT DATA
// =================================

const products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 50000,
        stock: 20
    },
    {
        id: 2,
        name: "Mouse",
        category: "Accessories",
        price: 800,
        stock: 50
    },
    {
        id: 3,
        name: "Monitor",
        category: "Electronics",
        price: 12000,
        stock: 5
    },
    {
        id: 4,
        name: "Keyboard",
        category: "Accessories",
        price: 1500,
        stock: 8
    },
    {
        id: 5,
        name: "Headphones",
        category: "Accessories",
        price: 2500,
        stock: 40
    }
];


// =================================
// UPDATE DASHBOARD
// =================================

function updateDashboard() {

    const total =
        products.length;

    const stock =
        products.reduce(
            (sum, product) =>
                sum + product.stock,
            0
        );

    const low =
        products.filter(
            product => product.stock < 10
        ).length;

    const value =
        products.reduce(
            (sum, product) =>
                sum + product.price * product.stock,
            0
        );


    const totalProducts =
        document.getElementById("totalProducts");

    const totalStock =
        document.getElementById("totalStock");

    const lowStock =
        document.getElementById("lowStock");

    const inventoryValue =
        document.getElementById("inventoryValue");


    if (totalProducts) {
        totalProducts.textContent = total;
    }

    if (totalStock) {
        totalStock.textContent = stock;
    }

    if (lowStock) {
        lowStock.textContent = low;
    }

    if (inventoryValue) {
        inventoryValue.textContent =
            "₹" + value.toLocaleString("en-IN");
    }
}


// =================================
// DISPLAY DASHBOARD TABLE
// =================================

function displayDashboardProducts() {

    const table =
        document.getElementById("dashboardTable");

    if (!table) return;

    table.innerHTML = "";


    products.forEach(product => {

        const status =
            product.stock >= 10
                ? "Available"
                : "Low Stock";

        const statusClass =
            product.stock >= 10
                ? "available"
                : "low-stock";


        table.innerHTML += `

            <tr>

                <td>
                    ${product.name}
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ₹${product.price.toLocaleString("en-IN")}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>
                    <span class="${statusClass}">
                        ${status}
                    </span>
                </td>

            </tr>

        `;
    });
}


// =================================
// PRODUCT PAGE
// =================================

function setupProductPage() {

    const productTable =
        document.getElementById("productTable");

    if (!productTable) return;


    const searchInput =
        document.getElementById("searchProduct");

    const stockFilter =
        document.getElementById("stockFilter");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const clearFilters =
        document.getElementById("clearFilters");


    // ---------------------------------
    // DISPLAY PRODUCTS
    // ---------------------------------

    function displayProducts() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const stock =
            stockFilter.value;

        const category =
            categoryFilter.value;


        const filtered =
            products.filter(product => {

                const searchMatch =
                    product.name
                        .toLowerCase()
                        .includes(search);


                let stockMatch = true;

                if (stock === "available") {
                    stockMatch =
                        product.stock >= 10;
                }

                if (stock === "low-stock") {
                    stockMatch =
                        product.stock < 10;
                }


                let categoryMatch = true;

                if (category !== "all") {
                    categoryMatch =
                        product.category === category;
                }


                return (
                    searchMatch &&
                    stockMatch &&
                    categoryMatch
                );
            });


        productTable.innerHTML = "";


        const count =
            document.getElementById("totalProducts");

        if (count) {
            count.textContent =
                filtered.length;
        }


        if (filtered.length === 0) {

            productTable.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        style="text-align:center;
                        padding:30px;"
                    >
                        No products found
                    </td>

                </tr>

            `;

            return;
        }


        filtered.forEach(product => {

            const status =
                product.stock >= 10
                    ? "Available"
                    : "Low Stock";

            const statusClass =
                product.stock >= 10
                    ? "available"
                    : "low-stock";


            productTable.innerHTML += `

                <tr>

                    <td>
                        ${product.name}
                    </td>

                    <td>
                        ${product.category}
                    </td>

                    <td>
                        ₹${product.price.toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        <span class="${statusClass}">
                            ${status}
                        </span>
                    </td>

                </tr>

            `;
        });
    }


    // ---------------------------------
    // SEARCH
    // ---------------------------------

    searchInput.addEventListener(
        "input",
        displayProducts
    );


    // ---------------------------------
    // STOCK FILTER
    // ---------------------------------

    stockFilter.addEventListener(
        "change",
        displayProducts
    );


    // ---------------------------------
    // CATEGORY FILTER
    // ---------------------------------

    categoryFilter.addEventListener(
        "change",
        displayProducts
    );


    // ---------------------------------
    // CLEAR FILTERS
    // ---------------------------------

    clearFilters.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            stockFilter.value = "all";

            categoryFilter.value = "all";

            displayProducts();
        }
    );


    // ---------------------------------
    // ADD PRODUCT
    // ---------------------------------

    const addButton =
        document.getElementById("addProduct");

    const productName =
        document.getElementById("productName");

    const productCategory =
        document.getElementById("productCategory");

    const productPrice =
        document.getElementById("productPrice");

    const productStock =
        document.getElementById("productStock");


    addButton.addEventListener(
        "click",
        function () {

            const name =
                productName.value.trim();

            const category =
                productCategory.value;

            const price =
                Number(productPrice.value);

            const stock =
                Number(productStock.value);


            if (
                name === "" ||
                category === "" ||
                price <= 0 ||
                stock < 0
            ) {

                alert(
                    "Please enter valid product details."
                );

                return;
            }


            products.push({

                id:
                    products.length + 1,

                name:
                    name,

                category:
                    category,

                price:
                    price,

                stock:
                    stock

            });


            // Clear form

            productName.value = "";

            productCategory.value = "";

            productPrice.value = "";

            productStock.value = "";


            displayProducts();

            updateDashboard();

            alert(
                "Product added successfully!"
            );
        }
    );


    displayProducts();
}


// =================================
// START APPLICATION
// =================================

updateDashboard();

displayDashboardProducts();

setupProductPage();

s