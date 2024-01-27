const bcryptjs = require("bcryptjs");
const UserModel = require('../models/user.js');

// Update user 
const updateUser = async (req, res, next) => {
    
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: { 
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            {
                new: true,
            }
        );
        
        const { password, ...rest } = updatedUser._doc; 
        res.status(200).json(updatedUser);

    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your account!"));
    }

    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateUser,
    deleteUser
}