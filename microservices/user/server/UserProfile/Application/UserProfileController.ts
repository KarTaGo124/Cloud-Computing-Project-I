import { Request, Response } from 'express';
import UserProfileService from '../Domain/UserProfileService';

/**
 * @swagger
 * tags:
 *   name: UserProfile
 *   description: UserProfile management
 */


/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile found
 *       404:
 *         description: User profile not found
 */
const getProfileById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userProfile = await UserProfileService.getProfileById(id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}






/**
 * @swagger
 * /profile/address/{id}:
 *   get:
 *     summary: Get user address by ID
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User address found
 *       404:
 *         description: User address not found
 */
const getUserAddressById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const address = await UserProfileService.getUserAddressById(id);
        res.status(200).json(address);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


/**
 * @swagger
 * /profile/name/{id}:
 *   put:
 *     summary: Update user name by ID
 *     tags: [UserProfile]
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
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       204:
 *         description: User name updated
 *       400:
 *         description: Error updating user name
 */
const updateName = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastname } = req.body;
    try {
        await UserProfileService.updateUserName(id, name, lastname);
        res.status(204).json({ message: "User name updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

/**
 * @swagger
 *  /profile/address/{id}:
 *   put:
 *     summary: Update user address by ID
 *     tags: [UserProfile]
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
 *               address:
 *                 type: string
 *     responses:
 *       204:
 *         description: User address updated
 *       400:
 *         description: Error updating user address
 */
const updateUserAddress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { address } = req.body;
    try {
        await UserProfileService.updateUserAddress(id, address);
        console.log("User address updated");
        res.status(204).json({ message: "User address updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}


/**
 * @swagger
 * /profile/phone/{id}:
 *   put:
 *     summary: Update user phone by ID
 *     tags: [UserProfile]
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
 *               phone:
 *                 type: string
 *     responses:
 *       204:
 *         description: User phone updated
 *       400:
 *         description: Error updating user phone
 */
const updateUserPhone = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { phone } = req.body;
    try {
        await UserProfileService.updateUserPhone(id, phone);
        res.status(204).json({ message: "User phone updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [UserProfile]
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               bio:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *     responses:
 *       204:
 *         description: User profile updated
 *       400:
 *         description: Error updating user profile
 */
const updateAllUserProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { first_name, last_name, phone_number, address, bio, date_of_birth } = req.body;

    try {
        await UserProfileService.updateAllUserProfile(id, first_name, last_name, phone_number, address, bio, date_of_birth);
        res.status(204).json({ message: "User profile updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}



export default {
    getProfileById,
    getUserAddressById,
    updateName,
    updateUserAddress,
    updateUserPhone,
    updateAllUserProfile

}