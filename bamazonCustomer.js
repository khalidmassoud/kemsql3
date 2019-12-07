var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What is the product ID you are trying to buy?",
      choices: [
        "1 flowers",
        "2 toothbrush",
        "3 chips"

      ]
    })
    .then(function (answer) {


      switch (answer.action) {
        case "1 flowers":
          flowersSearch();
          break;

        case "2 toothbrush":
          toothbrushSearch();
          break;

        case "3 chips":
          chipSearch();
          break;
      }
    });
}


function flowersSearch() {
  inquirer
    .prompt({
      name: "quant",
      type: "input",
      message: "How much do you want to buy?"
    })
    .then(function (answer) {
      var query = "SELECT * FROM products WHERE id ";
      var flowers = 1;
      var quantity = answer.quant;
      console.log("flowers: " + flowers);
      connection.query(query, { id: flowers }, function (err, res) {
        if (err) throw err;
        var i = 0;
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + "|| stock: " + res[i].stock_quantity);
        if (res[i].stock_quantity >= quantity) {
          console.log("total price is: " + quantity * res[i].price);
          updatedQuantity=res[i].stock_quantity - quantity;
          console.log("Quantity to update" + updatedQuantity);
          updateId = res[i].id;
          updateStockQuantity(updateId ,updatedQuantity);
          
        } else {
          console.log("Sorry, we dont have enough inventory");
          runSearch();
        }
       
      });
    });
  }


function toothbrushSearch() {
  inquirer
  .prompt({
    name: "quant",
    type: "input",
    message: "How much do you want to buy?"
  })
  .then(function (answer) {
    var query = "SELECT * FROM products WHERE id ";
    var toothbrush = 2;
    var quantity = answer.quant;
    console.log("toothbrush: " + toothbrush);
    connection.query(query, { id: toothbrush }, function (err, res) {
      if (err) throw err;
      var i = 1;
      console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + "|| stock: " + res[i].stock_quantity);
      if (res[i].stock_quantity >= quantity) {
        console.log("total price is: " + quantity * res[i].price);
        updatedQuantity=res[i].stock_quantity - quantity;
        console.log("Quantity to update" + updatedQuantity);
        updateId = res[i].id;
        updateStockQuantity(updateId ,updatedQuantity);
        
      } else {
        console.log("Sorry, we dont have enough inventory");
        runSearch();
      }
     
    });
  });
}


function chipSearch() {
  inquirer
  .prompt({
    name: "quant",
    type: "input",
    message: "How much do you want to buy?"
  })
  .then(function (answer) {
    var query = "SELECT * FROM products WHERE id ";
    var chip = 3;
    var quantity = answer.quant;
    console.log("toothbrush: " + chip);
    connection.query(query, { id: chip }, function (err, res) {
      if (err) throw err;
      var i = 2;
      console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + "|| stock: " + res[i].stock_quantity);
     
      if (res[i].stock_quantity >= quantity) {
        console.log("total price is: " + quantity * res[i].price);
        updatedQuantity=res[i].stock_quantity - quantity;
        console.log("Quantity to update" + updatedQuantity);
        updateId = res[i].id;
        updateStockQuantity(updateId ,updatedQuantity);
         
      } else {
        console.log("Sorry, we dont have enough inventory");
        runSearch();
      }
  
    });
  });
}

function updateStockQuantity(updateId, updatedQuantity){
  
  console.log("id is:" + updateId);
  console.log("updatedQuantity is:" + updatedQuantity);
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: parseInt(updatedQuantity)
      },
      {
         id: parseInt(updateId)
      }
    ],
    function(err) {
      if (err) throw err;
     // console.log(res.affectedRows + " products updated!");
      runSearch();
  
});
}


