import express from "express";
import resolver from "../utils/Resolver";
import auth from "../middlewares/auth";
import CreateUserController from "../controllers/CreateUserController";
import AuthenticateUserController from "../controllers/AuthenticateUserController";
import EditUserController from "../controllers/EditUserController";
import DeleteUserController from "../controllers/DeleteUserController";
import ListAllUsersController from "../controllers/ListAllUsersController";
import ListUserController from "../controllers/ListUserController";
import IListUserController from "../interfaces/IListUserController";

const userRouter: express.Router = express.Router();

const createUserController: CreateUserController = new CreateUserController();

const authenticateUserController: AuthenticateUserController =
  new AuthenticateUserController();

const editUserController: EditUserController = new EditUserController();

const deleteUserController: DeleteUserController = new DeleteUserController();

const listAllUsersController: ListAllUsersController =
  new ListAllUsersController();

const listUserController: IListUserController = new ListUserController();

userRouter.post("/register", resolver(createUserController.handle));

userRouter.post("/login", resolver(authenticateUserController.handle));

userRouter.put("/edit", auth, resolver(editUserController.handle));

userRouter.delete("/delete", auth, resolver(deleteUserController.handle));

userRouter.get("/user", auth, resolver(listUserController.handle));

userRouter.get("/users", auth, resolver(listAllUsersController.handle));

export default userRouter;
