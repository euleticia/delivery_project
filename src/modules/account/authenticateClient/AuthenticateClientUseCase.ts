import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}


export class AuthenticateClientUseCase {
  async execute( { username, password }: IAuthenticateClient ) {

    //Verifica se o username esta cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })
    
    if(!client) {
      throw new Error("Username or password incorrect")
    }
    //Verifica se a senha corresponde
    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch) {
      throw new Error("Username or password incorrect")
    }
    //Gera token
    const token = sign({username}, "019ACC25A4E242BB55AD489832ADA12D", {
      subject: client.id,
      expiresIn: "1d",
    })
    return token;
  }
}