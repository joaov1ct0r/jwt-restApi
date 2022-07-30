import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

import bcrypt from "bcryptjs";

import ICreateUserRequest from "../interfaces/ICreateUserRequest";

import InternalError from "../errors/InternalError";

import BadRequestError from "../errors/BadRequestError";

export default class CreateUserService {
  async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser> {
    try {
      const isUserRegistered: IUser | null = await User.findOne({
        where: { email },
      });

      if (isUserRegistered !== null) {
        throw new BadRequestError("Usuario já cadastrado!", 400);
      }

      const newUser: IUser = await User.create({
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      });

      return newUser;
    } catch (err: unknown) {
      throw new InternalError("Erro Interno", 500);
    }
  }
}
