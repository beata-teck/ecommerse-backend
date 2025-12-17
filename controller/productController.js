import product from '../models/product.js';

export const createProduct = async (req, res) => {
    const {name, description, price, stock, category, imgUrl} = req.body;
    const product= new product({
        name,
        price,
        user: req.user._id,
        description,
        stock,
        category,
        imgUrl
    }
    )
  const createdProduct= await product.save();
  res.status(201).json(createdProduct);
}

export const getProducts= async (req, res)=>{
    try{
        const products= await product.find({});
        res.jason(product);
    }
    catch(error){
        res.status(500).jason({message: 'Server Error'});
}
}
export const getProductById= async (req, res)=>{
    try{
        const product=await product.findById(req.params.id);
        if(product){
            res.json(product)
    }
    else{
        res.status(404).json({message: 'Product not found'});
    }
}
    catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

export const updateProduct= async (req, res)=>{
    try{
        const{name, description, price, stock, category, imgUrl}= req.body;
        const product= await product.findById(req.params.id);
        if(product){
            product.name= name || product.name;
            product.description= description || product.description;
            product.price= price || product.price;
            product.stock= stock || product.stock;
            product.category= category || product.category;
            product.imgUrl= imgUrl || product.imgUrl;
            const updatedProduct= await product.save();
            res.json(updatedProduct);
        }   
        else{
            res.status(404).json({message: 'Product not found'});
        }

    }
    catch(error){
        res.status(500).json({message: 'Server Error'});
    }   
}
