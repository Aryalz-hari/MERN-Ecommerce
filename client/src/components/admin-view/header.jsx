import React from 'react'
import { Button } from '../ui/button';
import { LogOut, AlignJustify } from "lucide-react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { toast } from 'sonner';

const AdminHeader = ({setOpen}) => {
  const dispatch= useDispatch();

  function handleLogout(){
    dispatch(logoutUser())
    toast('Logged out user');
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=> setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify/>
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-md'>
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;