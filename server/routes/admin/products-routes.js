const express = require('express');
const { upload } = require('../../helpers/cloudinary');
const {handleImageUpload, 
    addProduct, 
    fecthAllProducts,
     editProduct, 
     deleteProduct} = require('../../controllers/admin/products-controller');

const router= express.Router();


router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.get('/get', fecthAllProducts);
router.delete('/delete/:id', deleteProduct);

module.exports= router;
