import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState={
    isLoading: false,
    productsList:[]
}
const url = "http://localhost:5000";
export const addNewProduct= createAsyncThunk('/products/addnewproduct', async(formData)=>{
    const result = await axios.post(url+"/api/admin/products/add", formData,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return result?.data;
})
export const fetchAllProducts= createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      url+"/api/admin/products/get"
    );
    return result?.data;
  }
);
export const editProduct= createAsyncThunk(
  "/products/editProduct",
  async ({id, formData}) => {
    const result = await axios.put(
      url+`/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      url+`/api/admin/products/delete/${id}`
)
    return result?.data;
  }
);


const AdminProductSlice= createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading= true;
        }).addCase(fetchAllProducts.fulfilled, (state, action)=>{
          console.log(action.payload.data, 'data');
            state.isLoading= false;
            state.productList= action.payload.data;
        }).addCase(fetchAllProducts.rejected,(state)=>{
            state.isLoading= false;
            state.productList=[];
        })
    }
});

export default AdminProductSlice.reducer;
