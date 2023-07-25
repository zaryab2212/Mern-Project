import React from 'react'
import UserOrders from '../features/user/componets/UserOrders'
import NavBar from '../features/navbar/Navbar'
const UserOrdersPage = () => {
  return (
    <>
    <NavBar> 
        <h2 className='text-2xl mx-auto'>My Orders</h2>
               <UserOrders/>
    </NavBar>

    
    
    </>
  )
}

export default UserOrdersPage