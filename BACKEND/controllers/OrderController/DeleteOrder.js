const Order = require('../../models/Order');

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica que el ID sea un número
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID debe ser un número' });
        }

        const order = await Order.findByPk(Number(id)); // Asegúrate de convertir a número
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        order.status = 'eliminada';
        await order.save();

        res.status(200).json({ message: 'Orden eliminada' });
    } catch (error) {
        console.error("Error al eliminar la orden:", error); // Muestra el error en la consola
        res.status(500).json({ message: 'Error al eliminar la orden', error });
    }
};
