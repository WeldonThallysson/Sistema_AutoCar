import React, { useEffect, useContext } from "react";
import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";
import { schemaSignUp } from "../../constants/schemas/schema.signUp";

type FormData = z.infer<typeof schemaSignUp>;

const SignUp: React.FC = () => {
  const { handleInfoUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignUp),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        await updateProfile(res.user, {
          displayName: data.name,
        });
        handleInfoUser({
          name: data.email,
          email: data.email,
          uid: res.user.uid,
        });
        console.log("cadastrado com sucesso");
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);
  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <div className="flex flex-col bg-white p-12">
          <Link to="/" className="mb max-w-sm w-full">
            <img src={Logo} alt="logo do cabeçalho" className="w-full " />
          </Link>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white max-w-xl w-full rounded-lg p-4"
          >
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                name="name"
                error={errors.name?.message}
                register={register}
              />
            </div>
            <div className="mb-3">
              <Input
                type="email"
                placeholder="Digite seu email"
                name="email"
                error={errors.email?.message}
                register={register}
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Digite sua senha"
                name="password"
                error={errors.password?.message}
                register={register}
              />
            </div>
            <button
              className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
              type="submit"
            >
              Acessar
            </button>
          </form>
          <button
            className=" w-full rounded-md text-black p-2 font-medium"
            onClick={() => navigate("/signin", { replace: true })}
          >
            Já possui uma conta? faça login!
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
