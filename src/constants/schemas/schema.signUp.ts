import { z } from "zod";




export const schemaSignUp = z.object({
    name: z.string().min(1, {message: "O campo nome é obrigatório"}),
    email: z
      .string()
      .min(1,{ message: "O campo email é obrigatório"})
      .email("Insira um email válido"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .nonempty("O campo senha é obrigatório"),
  });
  