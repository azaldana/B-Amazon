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

//    function runSearch(){
//        inquirer.prompt({
//            name: "action",
//            type: "input",
//            message: "Please enter the ID of the product you would like to buy: "
//        }).then(function(answer){
//            console.log(answer);
//            readProducts();
//        })
//    }


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
                askQuantity();
                connection.end();

                // runSearch();

            });
        })
    });
    // searchID();
}

function askQuantity() {
    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "Please enter quantity: "
    }).then(function (answer) {
        var userInput;

        // for (var i =0; i < answer.length; i++){
        //     if (hhh) {

        //     }
        // }
        var query = connection.query("UPDATE products SET ? WHERE ?",
        [{
            stock_quantity:answer.quantity,
        },
        {
            item_id:answer.item_id
        }
        ],

        function(err) {
            if (err) throw err;
            console.log("Item added successfully");
            readProducts();
        })
    });
}



// function searchID(){
//     inquirer.prompt({
//         name: "action",
//         type: "input",
//         message: "Please enter the ID of the product you would like to buy: "
//     }).then(function(answer){
//         connection.query("SELECT item_id * FROM products", function (err, res) {
//             if (err) throw err;
//             // Log all results of the SELECT statement
//             console.table(res);
//             connection.end();
//         });
//     })

// }


//    function searchProducts() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "list",
//         message: "What would you like to do?",
//         choices: [
//           "Find songs by artist",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song"

//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//           case "Find songs by artist":
//             artistSearch();
//             break;

//           case "Find all artists who appear more than once":
//             multiSearch();
//             break;

//           case "Find data within a specific range":
//             rangeSearch();
//             break;

//           case "Search for a specific song":
//             songSearch();
//             break;
//         }
//       });
//    }