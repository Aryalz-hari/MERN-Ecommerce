const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require('../../models/Products');
  const handleImageUpload= async(req,res)=>{
    try{
        const b64= Buffer.from(req.file.buffer).toString('base64');
            const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);
        res.json({
            success:true,
            result
        })
    }
    catch(error){
    console.log(error)
    res.json({
        success:false,
        message:'Error in uploading Occured'
    })
    }
  }
   //addProduct

   const addProduct= async(req,res)=>{
    try{
      const {image,title,description,category,brand,price,salePrice, totalStock }= req.body;
      const newlyCreatedproduct = new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      });
      await newlyCreatedproduct.save();
      res.status(201).json({
        success:true,
        data:newlyCreatedproduct
      })
    }
    catch(e){
      console.log(e)
      res.status(500).json({
        success:false,
        message:'Error in adding Product'
      })
    }
   }

   const fecthAllProducts= async(req,res)=>{
    try{
    const listOfProducts= await Product.find({});
    res.status(200).json({
      success:true,
      data:listOfProducts
    })
   }
   catch(e){
    res.status(500).json({
      success:false,
      message:'Error in fetching products'
    })
   }
  }
   const editProduct = async (req, res) => {
     try {
    const {id}= req.params;
     const {
       image,
       title,
       description,
       category,
       brand,
       price,
       salePrice,
       totalStock,
     } = req.body;

     let findProduct= await Product.findById(id);
     if(!findProduct){
      return res.status(404).json({
        success:false,
        message:'Product Not found'
      })
     }
     findProduct.title= title||findProduct.title;
     findProduct.description = description || findProduct.description;
     findProduct.category = category || findProduct.category;
     findProduct.brand = brand || findProduct.brand;
     findProduct.price= price===''? 0: price ||findProduct.price;
     findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
     findProduct.totalStock= totalStock||findProduct.totalStock;
      findProduct.image = image || findProduct.image;

        await findProduct.save();
        res.status(200).json({
          success: true,
          data: findProduct,
        });
     } catch (e) {
       res.status(500).json({
         success: false,
         message: "Error in editing product",
       });
     }
   };
    const deleteProduct = async (req, res) => {
      try {
     const {id}= req.params;
     const product=await  Product.findByIdAndDelete(id);
     if(!product) return res.status(404).json({
      success:false,
      message:'Product not found'
     })
     res.status(200).json({
      success:true,
      message:'Product Deleted Successfully'
     })
      } catch (e) {
        res.status(500).json({
          success: false,
          message: "Error in deleting products",
        });
      }
    };


  module.exports= {handleImageUpload,
    addProduct, fecthAllProducts, editProduct, deleteProduct
  };