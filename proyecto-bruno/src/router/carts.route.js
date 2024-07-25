import { Router } from "express";

var router = Router();

var carts = [];

let nextCartId = 1;

router.get("/", (req, res) => {
    res.send({status: "success", payload: carts})
})



router.get("/:cid", (req, res) => {
    const id = +req.params.cid; // Convertir el CID a número
    const cart = carts.find(cart => cart.id === id);

    if (cart) {
        res.json({ status: "success", payload: cart.products });
    } else {
        res.status(404).json({ status: "error", message: "El carrito no se encuentra" });
    }
});



router.post("/", (req, res) => {
    // Crear un nuevo carrito con un ID único
    const nuevoCart = {
        id: nextCartId++, // Incrementar el contador para el nuevo ID
        products: [] // Inicialmente, el carrito está vacío
    };
    
    // Agregar el nuevo carrito al array
    carts.push(nuevoCart);

    // Responder con el carrito creado
    res.status(201).json({ status: "success", payload: nuevoCart });
});


router.post("/:cid/product/:pid", (req, res) => {
    const cid = +req.params.cid; 
    const pid = +req.params.pid; 
    const quantity = 1; 

    
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        return res.status(404).json({ status: "error", message: "El carrito no se encuentra" });
    }

  
    const productInCart = cart.products.find(p => p.product === pid);

    if (productInCart) {
        
        productInCart.quantity += quantity;
    } else {
        
        cart.products.push({ product: pid, quantity });
    }

    res.json({ status: "success", payload: cart.products });
});

export default router