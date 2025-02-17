import React, { useContext } from 'react'
import { FiLogIn, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { AuthContext } from '../../contexts/AuthContext';
export const Header: React.FC = () => {
   const {loadingAuth,signed} = useContext(AuthContext)

  return (
    <div className="flex w-full items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link to="/">
           <img src={Logo} alt='logo do cabeçalho' width={150} className='p-5' />
        </Link>
    
        {!loadingAuth && signed && (
              <Link to="/dashboard">
                <div className='border-2 rounded-full p-1 border-gray-900'>
                  <FiUser size={24} color='#000'/>
                </div>
             
            </Link>
        )}
        {!loadingAuth && !signed && (
              <Link to="/signin">
                <div className='border-2 rounded-full p-1 border-gray-900'>
                 <FiLogIn size={24} color='#000'/>
                </div>
              </Link>
        )}
 
     </header>
    </div>
   
  )
}
