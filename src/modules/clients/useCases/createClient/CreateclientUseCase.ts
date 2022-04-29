import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
interface ICreateClient {
  username: string;
  password: string
}

export class CreateClientUseCase {
  async execute({ password, username}: ICreateClient) {
    //valida se o usuario existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    })
    if(clientExist) {
      throw new Error("Cliente already exists")
    }
    //criptografa a senha
    const hashPassword = await hash(password, 10);
    //salva o client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      }
    });

  }
}