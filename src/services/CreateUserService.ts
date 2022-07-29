import { validateHandleUserRegister } from "../validators/validateUserData";

import User from "../database/models/userModel";

import IUser from "../types/userInterface";

import bcrypt from "bcryptjs";

import ICreateUserRequest from "../types/CreateUserRequestInterface";

export default class CreateUserService {
  async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser> {
    const { error } = validateHandleUserRegister({
      email,
      password,
      name,
      bornAt,
    });

    if (error) {
      throw new Error("Dados invalidos!");
    }

    try {
      const isUserRegistered: IUser | null = await User.findOne({
        where: { email },
      });

      if (isUserRegistered !== null) {
        throw new Error("Usuario já cadastrado!");
      }

      const newUser: IUser = await User.create({
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      });

      return newUser;
    } catch (err: unknown) {
      throw new Error("Erro Interno!");
    }
  }
}
