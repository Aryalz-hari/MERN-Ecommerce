import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { addProductFormElements } from '@/config';
import { Sheet, SheetContent, SheetHeader, SheetTitle ,SheetDescription} from '@/components/ui/sheet';
import CommonForm from '@/components/common/form';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct,fetchAllProducts,editProduct,deleteProduct } from '@/store/admin/products-slice';
import { toast } from 'sonner';
import AdminProductsTile from '@/components/admin-view/products-tile';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]= useState(false);
  const [formData, setFormData]= useState(initialFormData);
  const [imageFile, setImageFile]= useState(null);
  const [uploadedImageUrl, setUploadedImageUrl]= useState('');
  const [imageLoadingState, setImageLoadingState]= useState(false);
  const dispatch= useDispatch();
  const {productList}= useSelector(state=>state.adminProducts)

  function onSubmit(event){
    event.preventDefault();
    dispatch(addNewProduct({...formData,image:uploadedImageUrl})).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast('Product added successfully');
      }
    });


  }
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch]);
  console.log(productList,uploadedImageUrl,'ProductsList and ImageUrl')
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3">
        {
          productList&& productList.length>0?productList.map((productItem)=>
          <AdminProductsTile product={productItem}/>
          ):null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto ">
          <SheetHeader>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6 mr-2 ml-2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;