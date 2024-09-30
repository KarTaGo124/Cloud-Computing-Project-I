import { Request, Response } from "express";
import UserProfileService from "../../UserProfile/Domain/UserProfileService";
import CreateUserDTO from "../Dtos/CreateUserDTO";
import userService from "../Domain/UserService";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
const getUserWithId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserWithId(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

/**
 * @swagger
 * /users/regiser:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Error creating user
 */
const register = async (req: Request, res: Response) => {
  const { username, email, password }: CreateUserDTO = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = await userService.createUser(username, email, password);
    await UserProfileService.createUserProfile(newUser.id);
    res.status(201).json(newUser);
  } catch (error) {

    res.status(500).json({ error: "Error creating user", message: (error as Error).message });
    
  }
};

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: Username updated
 *       400:
 *         description: Username is required
 *       500:
 *         description: Error updating username
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 *       500:
 *         description: Error deleting user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error deleting user
 */
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
