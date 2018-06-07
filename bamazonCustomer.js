var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    selectProduct();
});

function selectProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want to buy?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                //console.log(answer.quantity);
                //console.log(answer.choice);
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        chosenItem = res[i];
                        //console.log(answer.quantity);
                        //console.log(chosenItem.stock_quantity);

                        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                            //console.log('yes');
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: chosenItem.stock_quantity - answer.quantity
                                    },
                                    {
                                        product_name: answer.choice
                                    }
                                ],
                                function (error) {
                                    if (error) throw err;
                                    console.log(`You paid $${chosenItem.price * answer.quantity}`);
                                });
                        }
                        else (console.log('Sorry, out of stock!'));

                    }
                }
            });
        
    });
}
