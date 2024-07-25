import express from "express"

import router_products from "./src/router/products.route.js";

import router_carts from "./src/router/carts.route.js";

var app = express();
var port = process.env.PORT || 8080
app.listen(port)

app.use(express.json());

app.use("/api/products", router_products);
app.use("/api/carts", router_carts);





//app.use('static/', express.static(__dirname + 'public')); //utilizar el frontend folder public

//static : prefijo de montaje para static/public/ etc...

//path absoluto : mas especifico para evitar problemas (__dirname)


var tal = []; //para almacenar datos get post de routes en array "tal"

//cada vez que utilizamos "app.use", usamos middleware : siempre se ejecuta 
//antes de llegar al endpoint que corresponde. 
//hay varios tipos de middleware y es prioridad ejecutarlos en orden

//multer middleware guardarlo en archivo utils (nuevo concepto)

//función callback (req,res)