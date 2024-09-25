import { Request, Response } from 'express';
import UserProfileService from '../Domain/UserProfileService';

const getProfileById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userProfile = await UserProfileService.getProfileById(id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

const getUserAddressById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const address = await UserProfileService.getUserAddressById(id);
        res.status(200).json(address);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

const updateUserName = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastname } = req.body;
    try {
        await UserProfileService.updateUserName(id, name, lastname);
        res.status(204).json({ message: "User name updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

const updateUserAddress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { address } = req.body;
    try {
        await UserProfileService.updateUserAddress(id, address);
        res.status(204).json({ message: "User address updated" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

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
    updateUserName,
    updateUserAddress,
    updateUserPhone,
    updateAllUserProfile

}