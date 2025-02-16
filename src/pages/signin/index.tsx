import React,{useContext, useEffect} from 'react'
import { Container } from '../../components/container'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { Input } from '../../components/input'
import {useForm} from 'react-hook-form'
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import {auth} from '../../services/firebaseConfig'
import { signInWithEmailAndPassword,signOut } from 'firebase/auth'
import { AuthContext } from '../../contexts/AuthContext'
import { schemaSign } from '../../constants/schemas/schema.signIn'


type FormData = z.infer<typeof schemaSign>

const SignIn: React.FC = () => {
  const {register, handleSubmit, formState:{ errors }} = useForm<FormData>({
    resolver: zodResolver(schemaSign),
    mode: "onChange"
  })
  const navigate = useNavigate()
  const {handleInfoUser} = useContext(AuthContext)
  
  const onSubmit = (data: FormData) => {
        signInWithEmailAndPassword(auth, data.email,data.password)
        .then((res) => {
           navigate('/dashboard', {replace: true})
           handleInfoUser({
            name: data.email,
            email: data.email,
            uid: res.user.uid
          })
        }).catch((err) => console.log(err))
        console.log(data)
  }

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
    handleLogout()

  },[])
  return (
    <Container>
      <div className='flex w-full min-h-screen  justify-center items-center flex-col gap-4'>

        <div className="flex bg-white max-w-xl flex-col p-12">
          <Link to="/" className='mb max-w-sm w-full'>
            <img src={Logo} alt='logo do cabeçalho' className='w-full ' />
          </Link>
          <form 
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white max-w-xl w-full rounded-lg p-4'>
            <div className='mb-3'>
              <Input
                type="email"
                placeholder="Digite seu email"
                name="email"
                error={errors.email?.message}
                register={register}
              />  
            </div>
            <div className='mb-3'>
              <Input
                type="password"
                placeholder="Digite sua senha"
                name="password"
                error={errors.password?.message}
                register={register}
              />  
            </div>
            <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium mb-3' type='submit'>
              Acessar
            </button>
             
             <button className=' w-full rounded-md text-black p-2 font-medium' onClick={() => navigate('/signup', {replace:true})}>
              Ainda não tem uma conta? Cadastre-se!  
            </button>
        </form>
        </div>
    
    
      </div>
    </Container>
 
  )
}

export default SignIn