var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "passwordhere",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        purchaseOrder();
        //connection.end();
    });
}

function purchaseOrder() {
    inquirer
        .prompt({
            name: "purchaseID",
            type: "list",
            message: "What is the ID of the product that you would like to buy?",
            choices: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ]
        })
        .then(function(answer) {
            console.log(answer);
            var pickedID = parseInt(answer.purchaseID);
            console.log(pickedID);
              inquirer
              .prompt({
                name: "quantity",
                type: "input",
                message: "How many units of this product would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
              })
              .then(function(answer) {
                  var productQuantity = parseInt(answer.quantity);
                  console.log(productQuantity);
                  checkInventory(pickedID, productQuantity);
              });
        }).catch(function (error) {
            console.log(error);
        });
};

function checkInventory(chosenID, quantity) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) {
                console.log(err);
                //throw err;
            }
            // connection.end();
            var productData = res;
            var currentProduct;

            //var currentProduct = productData[chosenID - 1];

            for (var i = 0; i < productData.length ; i++) {
                if (productData[i].item_id === chosenID) {
                    currentProduct = productData[i];
                    break;
                }
            }

            if (!currentProduct) {
                console.log("Something went wrong. No product found!")
                return;
            }

            var stockQuantity = currentProduct.stock_quantity;
            if (stockQuantity < quantity) {
                console.log("Insufficient quantity!");
            } else {
                console.log("Order Fulfilled");
            }
        });
}

function remainingQuantity() {
    console.log("Updating all quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }

function showTotalCost(quantity, price) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
            //throw err;
        }
        connection.end();
        var productData = res;
        
        for (var i = 0; i < productData.length ; i++) {
            if (productData[i].item_id === chosenID) {
                currentProduct = productData[i];
                break;
            }
        }
            })
  }

  function showTotalCost(quantity, price) {
      return quantity * price;
  }