const Producto = [
        {
            id: 1, name: 'Zapatillas Running Pro', description: 'Zapatillas ligeras y transpirables para corredores de larga distancia', price: 85.99, stock: 30
        },
        {
            id: 2, name: 'Zapatillas Urban Style', description: 'Zapatillas de estilo urbano con suela antideslizante y diseño moderno', price: 69.99, stock: 45
        },
        {
            id: 3, name: 'Zapatillas Deportivas All-Terrain', description: 'Zapatillas resistentes para todo tipo de terrenos, ideales para hiking y deportes al aire libre', price: 120.00, stock: 25
        },
        {
            id: 4, name: 'Zapatillas Casual Comfort', description: 'Zapatillas casuales con plantilla de espuma viscoelástica para mayor comodidad', price: 55.00, stock: 60
        },
        {
            id: 5, name: 'Zapatillas High Performance Basketball', description: 'Zapatillas de baloncesto de alto rendimiento con soporte extra para los tobillos', price: 140.00, stock: 20
        }
    ]  


//GetProducts

exports.GetProducts = (req,res) =>{
    res.status(200).json({
        success: true,
        data: Producto
    })
}


//CreateProduct

exports.CreateProduct = (req,res) =>{
    const newProduct = {
        id: Producto.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    };
    Producto.push(newProduct);
    res.status(201).json({
        success: true,
        data: newProduct
    });
};

//UpdateProduct

exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id)
    const product = Producto.find(producto => producto.id === productId)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        })
    }

    if (req.body.name) {
        product.name = req.body.name
    }

    if (req.body.description){
        product.description = req.body.description
    }

    if (req.body.price){
        product.price = req.body.price
    }

    res.status(200).json({
        success: true,
        data: product
    })

}

//DeleteProduct

exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = Producto.findIndex(producto => producto.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        });
    }

    
    Producto.splice(productIndex, 1);

    res.status(200).json({
        success: true,
        message: "Producto eliminado exitosamente"
    });
};