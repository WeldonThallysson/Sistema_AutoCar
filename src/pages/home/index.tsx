import React, { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Link } from "react-router-dom";
import { CarsProps } from "../../interfaces";


const Home: React.FC = () => {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [filter, setFilter] = useState<string>();
  const [loadImages, setLoadImages] = useState<string[]>([]);

  function handleImageLoad(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef)
      .then((snapshot) => {
        console.log(snapshot.docs);

        let listCars = [] as CarsProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            model: doc.data().model,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            whatsapp: doc.data().whatsapp,
            description: doc.data().description,
            uid: doc.data().uid,
          });
        });

        setCars(listCars);
      })
      .catch((err) => console.log(err));
  }

  async function handleFilterCar() {
    if (filter === "") {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const filters = query(
      collection(db, "cars"),
      where("name", ">=", filter?.toUpperCase()),
      where("name", "<=", filter?.toUpperCase() + "\uf8ff")
    );

    const filterSnapshot = await getDocs(filters);
    let listCars = [] as CarsProps[];

    filterSnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
            name: doc.data().name,
            model: doc.data().model,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            whatsapp: doc.data().whatsapp,
            description: doc.data().description,
            uid: doc.data().uid,
      });
    });
    setCars(listCars);
  }
  useEffect(() => {
    loadCars();
  }, []);

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          value={filter}
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
          onClick={() => handleFilterCar()}
        >
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-8 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.length !== 0 ? (
          <>
            {cars.map((item) => (
              <Link key={item.id} to={`/car/${item.id}`}>
                <section className="w-full bg-white rounded-lg relative">
                  <div
                    className="w-full h-75 rounded-lg bg-slate-200"
                    style={{
                      display: loadImages.includes(item.id) ? "none" : "flex",
                    }}
                  />
                  <img
                    className="w-full h-60 rounded-lg mb-2 object-cover max-h-75 hover:scale-105 transition-all"
                    src={item.images[0].url}
                    style={{
                      display: loadImages.includes(item.id) ? "flex" : "none",
                    }}
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
              </Link>
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
  );
};

export default Home;
