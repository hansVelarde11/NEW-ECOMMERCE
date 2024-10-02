const User=require('../models/User')

const registerUser = async(req,res)=>{
    try{
        const{id,name,email,password,role,isDeleted} = req.body

        const newUser= new User({
            id,
            name,
            email,
            password,
            role,
            isDeleted
        })
        const savedUser=await newUser.save()
        res.status(201).json(savedUser)

    }catch(error){
        res.status(500).json({message:"Error al registrar el usuario",error})
    }
}

const updateUser = async(req,res)=>{
    try{
        const userId=req.params.id
        const updatedData=req.body

        const updateUser=await User.findByIdAndUpdate(userId,updatedData,{new:true})

        if(!updateUser){
            return res.status(404).json({message: "Usuario no enoccontrado"})
        }
        res.status(200).json(upadatedUser)

    }catch(error){
        res.status(500).json({message:"Errror al actualizar el usuario",error})
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // En lugar de eliminar el usuario, actualizamos el campo isDeleted a true
        const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario marcado como eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Usuario", error });
    }
};


module.exports={deleteUser,registerUser,updateUser}