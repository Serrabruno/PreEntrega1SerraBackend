import { Router } from "express";
import { uploader } from "../utils.js";

var router = Router();

var products = [];

let nextId = 1;

// router.get("/", (req, res) => {
//     res.send({status: "success", payload: products})
// })


router.get("/", (req, res) => {
   
    const limit = parseInt(req.query.limit, 10) || products.length; 

    
    const productsToSend = products.slice(0, limit); 

   
    res.send({
        status: "success",
        payload: products
    });
});




router.get("/:pid", (req, res) => {
    var pid = +req.params.pid;
    var product = products.find(product => product.id === pid);

    if (product) {
        res.json({ status: "success", payload: product });
    } else {
        res.status(404).json({ status: "error", message: "el producto no se encuentra" });
    }
});

router.post("/",uploader.single('file'), (req, res) => {
    var { title, description, code, price, stock, category, thumbnails } = req.body;

    
    var newProduct = {
        id: nextId++, 
        title,
        description,
        code,
        price,
        status: true, 
        stock,
        category,
        thumbnails
    };
    
   
    products.push(newProduct);

    
    res.status(201).json({ status: "success", payload: newProduct });
});

router.put("/:pid", (req, res) => {
    var pid = +req.params.pid;
    var { title, description, code, price, stock, category, thumbnails } = req.body;

    var id = products.findIndex(product => product.id === pid);


    
    var updatedProduct = { ...products[id], title, description, code, price, stock, category, thumbnails };

    products[id] = updatedProduct;
    res.json({ status: "success", payload: updatedProduct });
});


router.delete("/:pid", (req, res) => {
    var id = +req.params.pid; // Convertir el PID a número
    var index = products.findIndex(product => product.id === id);

    // Eliminar el producto del array
    products.splice(index, 1);

    res.json({ status: "success", message: "Producto eliminado" });
});

export default router;