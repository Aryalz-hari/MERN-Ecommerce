import { Outlet } from "react-router-dom"
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
const AdminLayout  = () => {
  const [openSidebar, setOpenSideBar]= useState(false);
  return (
    <div className='flex min-h-screen w-full'> <AdminSidebar open={openSidebar} setOpen={setOpenSideBar}/>
        <div className=' flex flex-1 flex-col'><AdminHeader setOpen={setOpenSideBar}/>
            <main className='flex flex-1 bg-muted/40n p-4 md:p-6'>
            <Outlet></Outlet>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout;