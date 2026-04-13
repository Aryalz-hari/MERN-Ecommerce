import React from 'react'
import { Outlet } from 'react-router-dom';
function AuthLayout(){
    return (
      <div className=" flex min-h-screen w-full">
        <div className="hidden lg:flex items-center justify-center bg-gray-800  w-1/2 px-12 ">
          <div className="max-w-md space-y-6 text-center text-primary-foreground">
            <h1 className="relative text-4xl font-extrabold tracking-tight text-white px-6 py-4">
              <span className="relative z-10">Welcome To Ecommerce</span>


              <span className="absolute inset-0 rounded-xl border-6 border-transparent animate-border" />
            </h1>
          </div>
        </div>
        <div className=" flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-5 lg:px-8">
          <Outlet></Outlet>
        </div>
      </div>
    );
}
export default AuthLayout;