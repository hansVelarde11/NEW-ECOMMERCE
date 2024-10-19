const Order = require('../../models/Order');
const User = require('../../models/User');
const { Op } = require('sequelize');

// Función para obtener las órdenes de un usuario con estado de pago (pendiente o pagado)
exports.getUserOrdersByStatus = async (req, res) => {
    try {
      
        const { userId, status} = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

      
        const orders = await Order.findAll({
            where: {
                userId: userId,
                status: {
                    [Op.or]: ['pendiente', 'pagado'] 
                }
            }
        });

        
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes para este usuario en el estado especificado' });
        }

       
        res.status(200).json({
            message: 'Órdenes encontradas',
            user: user,
            orders: orders
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las órdenes', error });
    }
};
