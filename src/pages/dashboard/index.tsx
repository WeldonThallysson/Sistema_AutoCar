import React, { useContext, useEffect, useState } from 'react'
import { Container } from '../../components/container'
import { DashboardHeader } from '../../components/panelHeader'
import { FiTrash2 } from 'react-icons/fi' 
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db,storage } from '../../services/firebaseConfig';
import {ref,deleteObject} from 'firebase/storage'
import { AuthContext } from '../../contexts/AuthContext';

type ImageItemProps = {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
};
type CarsProps = {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  whatsapp:string;
  city: string;
  km: string;
  images: ImageItemProps[];
};

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages,setLoadImages] = useState<string[]>([]);
  const {user} = useContext(AuthContext)

  function handleImageLoad(id: string){
    setLoadImages((prev) => [...prev, id])
  }

 async function handleDeleteCar(car: CarsProps){
  const docRef = doc(db,"cars", car.id)
  await deleteDoc(docRef)

  car.images.map(async (image) => {
    const imagePath = `images/${image.uid}/${image.name}`
    const imageRef = ref(storage,imagePath)
     try{
        await deleteObject(imageRef)
        setCars(cars.filter(item => item.id !== car.id))
     }catch(err){
      console.log(err)
     }
  })


 }


 useEffect(() => {
   function loadCars() {
    if(!user?.uid){
      return
    }
     const carsRef = collection(db, "cars");
     const queryRef = query(carsRef, where("uid", "==", user?.uid));

     getDocs(queryRef)
       .then((snapshot) => {
         console.log(snapshot.docs);
         let listCars = [] as CarsProps[];
         snapshot.forEach((doc) => {
           listCars.push({
             id: doc?.id,
             name: doc?.data()?.name,
             year: doc?.data()?.year,
             km: doc?.data()?.km,
             city: doc?.data()?.city,
             price: doc?.data()?.price,
             images: doc?.data()?.images,
             whatsapp: doc.data().whatsapp,
             uid: doc?.data()?.uid,
           });
         });

         setCars(listCars);
       })
       .catch((err) => console.log(err));
   }
   loadCars();
 }, [user]);
  return (
    <Container>
      <DashboardHeader/>
      
      <main className='grid grid-cols-2 gap-6 md:grid-cols2-2 lg:grid-cols-3'>
      {cars.length !== 0 ? (
          <>
          
            {cars.map((item) => (
                <section key={item.id} className='w-full bg-white rounded-lg relative'>
                  <div 
                   className="w-full h-72 rounded-lg bg-slate-200"
                   style={{display: loadImages.includes(item.id) ? "none" : "block"}}
                  />
                  <button 
                    onClick={() => {handleDeleteCar(item)}}
                    className='absolute bg-white w-10 h-10 rounded-full flex items-center justify-center right-2 top-2 '
                 >
                     <FiTrash2 size={22} color='#000'/>
                  </button>
                  <img
                    className="w-full h-60 rounded-lg mb-2 max-h-72 "
                    src={item.images[0].url}
                    style={{display: loadImages.includes(item.id) ? "block" : "none"}}
                    onLoad={() => handleImageLoad(item.id)}
                    alt="Carro"
                  />
                  <p className="font-bold mt-1 mb-2 px-2">{item.name}</p>
                  <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">{item.year}</span>
                    <strong className="text-black font-medium text-xl">
                      R$ {item.price}
                    </strong>
                  </div>
                  <div className="w-full h-px bg-slate-200 my-2"></div>
                  <div className="px-2 pb-2">
                    <span className="text-zinc-700">{item.city}</span>
                  </div>
                </section>
            ))}
          </>
        ) : (
          <section className="w-full flex justify-center align-center p-2">
            <p className="w-full font-medium text-center text-black">
              Nenhum item encontrado
            </p>
          </section>
        )}
      </main>
    </Container>
  )
}

export default Dashboard