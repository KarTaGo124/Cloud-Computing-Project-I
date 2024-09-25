import { Request, Response } from "express";
import CreateUserDTO from "../Dtos/CreateUserDTO";
import userService from "../Domain/UserService";

const getUserWithId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserWithId(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

/// POST
const register = async (req: Request, res: Response) => {
  const { username, email, password }: CreateUserDTO = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const newUser = await userService.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

//patch
const updateUsername = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const updatedUser = await userService.updateUsername(id, username);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating username" });
  }
};

//delete
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await userService.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

export default {
  getUserWithId,
  register,
  login,
  updateUsername,
  deleteUser,
};
