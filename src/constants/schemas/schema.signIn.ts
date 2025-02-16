import { z } from "zod";

export const schemaSign = z.object({
    email: z.string().min(1, {message: "O campo email é obrigatório"}).email("Insira um email válido"),
    password: z.string().nonempty("O campo senha é obrigatório")
  })
  