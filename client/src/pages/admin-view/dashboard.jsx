import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/products-slice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { productList = [], isLoading } = useSelector(
    (state) => state.adminProducts || {}
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Products in dashboard:", productList);
  }, [productList]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">
            {isLoading ? "Loading..." : productList?.length || 0}
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">2</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;