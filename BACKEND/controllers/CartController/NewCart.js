const Cart = require('../../models/Cart');

exports.CreateCart = async (req, res) => {
  try {
    const { userId } = req.body; 

    
    const existingCart = await Cart.findOne({ where: { userId } });
    if (existingCart) {
      return res.status(400).json({ message: "El carrito ya existe para este usuario." });
    }

   
    const newCart = await Cart.create({ userId });
    
   
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el carrito", error });
  }
};
