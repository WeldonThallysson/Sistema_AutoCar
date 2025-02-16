import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import AuthProvider from './contexts/AuthContext'
import { register } from 'swiper/element'
register();

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function App() {
  return (
    <>
     <AuthProvider>
       <RouterProvider router={router}/>
     </AuthProvider>
     
    </>
  )
}

export default App
