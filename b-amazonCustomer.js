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
    readProducts();
});


function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // connection.end();

        inquirer.prompt({
            name: "action",
            type: "input",
            message: "Please enter the ID of the product you would like to buy: "
        }).then(function (answer) {

            var query = "SELECT item_id, product_name, price FROM products WHERE ?";
            connection.query(query, { item_id: answer.action }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    // console.table(res[i].item_id + res[i].product_name);
                }
                console.table(res);
                askQuantity(answer.action);
                // connection.end();

                // runSearch();

            });
        })
    });
    // searchID();
}

function askQuantity(item_id) {
    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "Please enter quantity: "
    }).then(function (user) {
        connection.query("SELECT stock_quantity, price FROM products WHERE ?", { item_id: parseInt(item_id) }, function (err, res) {
            // console.log(res);
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                // console.table(res[i].item_id + res[i].product_name);
            }

            // console.table(res);
            var currentStock = res[0].stock_quantity;
            var itemPrice = res[0].price;
            // console.log(res[0].price);
            // console.log(currentStock);

            if (user.quantity > currentStock) {
                console.log("I'm sorry but this product is currently out of stock.");
                readProducts();

              } else {
                console.log("This item has been successfully added to your cart. ");
                // console.log("Quantity: " + res[0].stock_quantity - user.quantity);
                // console.log("----------------");
                updatedQ= parseInt(currentStock) - parseInt(user.quantity);
                // console.log(updatedQ);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedQ , item_id ], function (err, res) {
                    // console.log("stock has been updated");
                    console.log("Your final total is: " + user.quantity * itemPrice);
                    connection.end();
                })
            }
        });
    })
}

// function updateQuantity(key){
//     var quantityEntered = [];
//     var userInput = [];
//     var finalPrice = price * quantityEntered;
//     var price = res[0].price;

//     key.userInput = quantityEntered;
//     quantityEntered.push(key.userInput);

//     var query = connection.query(
//         "UPDATE stock_quantity FROM products WHERE ?",
        
//             {
//                 stock_quantity: 2500
//             },

//         function (err, res) {
//             console.log(res.affectedRows + " item updated!\n");
//             // Call deleteProduct AFTER the UPDATE completes
//             // deleteProduct();
//         }
//     );

// }

// function buyMore(){
//     inquirer.prompt({
//         name: "stop",
//         type: "confirm",
//         message: "Would you like to buy another item?"
//     }).then(function (response) {
//         if (response.stop){
//             readProducts();

//         } else {
//             console.log("Thank you for shopping. Your final total comes out to:");
//             connection.end();
//         }
        
//     })
// }