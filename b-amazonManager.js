var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "al3xZa1!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Which menu would you like to view?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {

        if (answer.menu === "View Products for Sale") {
            viewProducts();

        }

        if (answer.menu === "View Low Inventory") {
            lowInventory();

        }

        if (answer.menu === "Add to Inventory") {
            addInventory();

        }

        if (answer.menu === "Add New Product") {
            addProduct();

        }
    })
}

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        mainMenu();
        // connection.end();
    })
}

function lowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 50", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        }

        console.table(res);
        mainMenu();
        // connection.end();
    })

}

function addInventory() {
    // console.log(item_id)
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Please enter product ID:"
        },

        {
            name: "inventory",
            type: "input",
            message: "Enter new inventory for product:"
        }

    ]).then(function (user) {
        connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: parseInt(user.item) }, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
            }

            var currentStock = res[0].stock_quantity;

            if (user.inventory >= 10) {

                var newQuantity = parseInt(currentStock) + parseInt(user.inventory);
                // console.log(newQuantity);

                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, parseInt(user.item)], function (err, res) {
                    if (err) throw err;

                    console.log("The product inventory has been updated!");
                    mainMenu();
                })
            } else {
                console.log("Please enter a value greater than 10.");
            }
        })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Please provide a product ID: "
        },

        {
            name: "name",
            type: "input",
            message: "Enter product name: ",
        },

        {
            name: "department",
            type: "input",
            message: "Enter department name: ",
        },

        {
            name: "productPrice",
            type: "input",
            message: "Enter product price: "
        },

        {
            name: "stock",
            type: "input",
            message: "Enter product stock quantity: "
        },

    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",

            {
                item_id: answer.itemID,
                product_name: answer.name,
                department_name: answer.department,
                price: answer.productPrice,
                stock_quantity: answer.stock
            },

            function (error) {
                if (error) throw error;
                console.log("The product was added successfully");
                mainMenu();
                // connection.end();
            }
        )
    })
}