import {RegisterOptions,UseFormRegister} from 'react-hook-form'
type InputProps = {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export const Input = ({type,placeholder,name,register,rules,error}:InputProps) => {
 return (
   <div>
    <input 
       className='w-full border-2 rounded-md h-11 px-2'    
      {...register(name,rules)}
      type={type}
      placeholder={placeholder}
      id={name}

     />
     {error && <p className='my-1 text-red-500'>{error}</p>}
   </div>
 );
}