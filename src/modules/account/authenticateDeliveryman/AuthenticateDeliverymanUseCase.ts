import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}


export class AuthenticateDeliverymanUseCase {
  async execute( { username, password }: IAuthenticateDeliveryman ) {

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })
    
    if(!deliveryman) {
      throw new Error("Username or password incorrect")
    }
    //Verifica se a senha corresponde
    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error("Username or password incorrect")
    }
    //Gera token
    const token = sign({username}, "019ACC25A4E242BB77AD489832ADA12D", {
      subject: deliveryman.id,
      expiresIn: "1d",
    })
    return token;
  }
}