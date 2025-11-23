import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import { addProductFormElements } from '@/config';
import { Sheet, SheetContent, SheetHeader, SheetTitle ,SheetDescription} from '@/components/ui/sheet';
import CommonForm from '@/components/common/form';
import ProductImageUpload from '@/components/admin-view/image-upload';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salesPrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]= useState(false);
  const [formData, setFormData]= useState(initialFormData);
  const [imageFile, setImageFile]= useState(null);
  const [uploadedImageUrl, setUploadedImageUrl]= useState('');
  const [imageLoadingState, setImageLoadingState]= useState(false)
  function onSubmit(event){
    event.preventDefault();
  }
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
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3"></div>
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