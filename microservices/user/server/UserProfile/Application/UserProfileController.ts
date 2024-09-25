import { Request, Response } from 'express';
import UserProfileService from '../Domain/UserProfileService';

const getUserProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserProfileService.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
}

const getUserAddress = async (req: Request, res: Response) => {
   const {id} = req.params;
   const address = await UserProfileService.getUserAddressById(id);
    if (!address) {
         return res.status(404).json({ message: 'Address not found' });
    }
    return res.status(200).json(address);
}

const updateName = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const { lastname } = req.body;
    const user = await UserProfileService.updateUserName(id, name, lastname);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
}

const updateAddress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { address } = req.body;
    const user = await UserProfileService.updateUserAddress(id, address);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
}

const updatePhone = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { phone } = req.body;
    const user = await UserProfileService.updateUserPhone(id, phone);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
}


export default {
    getUserProfile,
    getUserAddress,
    updateName,
    updateAddress,
    updatePhone
}