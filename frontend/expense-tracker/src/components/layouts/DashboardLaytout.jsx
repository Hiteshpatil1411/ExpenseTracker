import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLaytout = ({ children , activeMenu }) => {
    const {user} =  useContext(UserContext);
  return (
    <div className=''>
      <Navbar activeMenu={activeMenu}/>

        {
            user ? (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu}>  </SideMenu>
                        
                    </div>
                    <div className="grow mx-5"> 
                        {children}

                    </div>
                </div>
            ):(
                <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
            )
        }

     
    </div>
  )
}

export default DashboardLaytout
