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
  const [currentEditedID, setCurrentEditedID]= useState(null);
  const dispatch= useDispatch();
  const {productList}= useSelector(state=>state.adminProducts)

async function onSubmit(event) {
  event.preventDefault();

  if (currentEditedID !== null) {
    // Edit mode
    const { payload } = await dispatch(
      editProduct({ id: currentEditedID, formData })
    );
    console.log(payload, "editedData");

    if (payload?.success) {
      await dispatch(fetchAllProducts());
      setFormData(initialFormData);
      setOpenCreateProductsDialog(false);
      setCurrentEditedID(null);
      toast("Product updated successfully");
    }
  } else {
    // Add mode
    const { payload } = await dispatch(
      addNewProduct({ ...formData, image: uploadedImageUrl })
    );
    console.log(payload, "addedData");

    if (payload?.success) {
      await dispatch(fetchAllProducts());
      setOpenCreateProductsDialog(false);
      setImageFile(null);
      setFormData(initialFormData);
      toast("Product added successfully");
    }
  }
}
function handleDelete(getCurrentProductId){
  console.log(getCurrentProductId, 'deletedid');
  dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts());
      toast("Product removed successfully");
    }
  })

  
}

function isFormValid() {
  return Object.keys(formData)
    .filter((currentKey) => currentKey !== "averageReview")
    .map((key) => formData[key] !== "")
    .every((item) => item);
}



  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch]);
console.log(formData, 'productList');


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
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductsTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedID={setCurrentEditedID}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedID(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto ">
          <SheetHeader>
            <SheetTitle>
              {currentEditedID !== null ? "Edit Product" : "Add new Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedID={currentEditedID}
            isEditMode={currentEditedID !== null}
          />
          <div className="py-6 mr-2 ml-2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedID !== null ? "Edit " : "Add"
              }
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;