import React, { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

import { Swiper, SwiperSlide } from "swiper/react";
import { CarsProps } from "../../interfaces";

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCar = () => {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);

      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/");
        }
        setCar({
          id: snapshot?.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          city: snapshot.data()?.city,
          model: snapshot.data()?.model,
          uid: snapshot.data()?.uid,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          whatsapp: snapshot.data()?.whatsapp,
          price: snapshot.data()?.price,
          km: snapshot.data()?.km,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images,
        });
      });
    };
    if (car && car?.images?.length > 1) {
      setSliderPerView(1);
    }
    loadCar();
  }, [id]);

  useEffect(() => {
    function HandleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }
    HandleResize();

    window.addEventListener("resize", HandleResize);
  }, [window.innerWidth]);
  return (
    <Container>
      <Swiper
        slidesPerView={sliderPerView}
        pagination={{ clickable: true }}
        navigation
      >
        {car?.images.map((item) => (
          <SwiperSlide key={item.name}>
            <img src={item.url} className="w-full h-96 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4 ">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
          </div>

          <p>{car?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4 ">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div>
                <p>KM</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
          </div>
          <strong>Descrição:</strong>
          <p className="mb-4">{car?.description}</p>
          <strong>Whatsapp:</strong>
          <p className="mb-4">{car?.whatsapp}</p>

          <a
            href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=Olá vi esse ${car?.name} e fiquei interessado`}
            target="_blank"
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
};

export default CarDetails;
