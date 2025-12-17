import user from "../models/user";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({userId: id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const userExists = await user.findOne({email});
    if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }
    const user= await user.create({
        name,
        email,
        password,
        isAdmin: isAdmin || false,
    });
    if(user){
        res.status(201).jason({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else{
        res.status(400).json({message: 'Invalid user data'});
    }}
    export const loginUser= async (req, res)=>{
            if(user && (await user.matchPassword(password))){
        res.json({
             _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else {
        res.status(401).json({message: 'Invalid email or password'});
    }
}

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404).json({message: 'User not found'});
        }
    }
    