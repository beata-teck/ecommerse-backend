import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
}
);
userSchema.method.matchesPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
   userSchema.pre('save', async function(next)
{
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.gynSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}) 

const user= mongoose.model('User', userSchema);
export default user;