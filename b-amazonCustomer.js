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
   
   connection.connect(function(err) {
    if (err) throw err;
    readProducts();
   });

   function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // connection.end();

        inquirer.prompt({
            name: "action",
            type: "input",
            message: "Please enter the ID of the product you would like to buy: "
        }).then(function(answer){

            var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.item }, function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                  console.log("Product: " + res[i].product_name);
                }
            });
        })
    });
    // searchID();
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