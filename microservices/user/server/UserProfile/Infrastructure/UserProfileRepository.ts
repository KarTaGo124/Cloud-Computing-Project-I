import pool from '../../config/db';
import UserProfileResDTO from '../Dtos/UserProfileResDTO';

const findProfileById = async (id: number): Promise<UserProfileResDTO | null> => {
    const [result]: any = await pool.query('SELECT id, first_name, last_name, phone_number, address, country FROM user_profile WHERE user_id = ?', [id]); 
    if (result.length === 0) {
        return null;
    }
    return result[0];
}
const updateUserName = async (id: number, name: string, lastname: string): Promise<boolean> => {
    const result: any = await pool.query('UPDATE user_profile SET first_name = ?, last_name = ? WHERE user_id = ?', [name, lastname, id]);
    return result.affectedRows > 0;
}

const updateUserAddress = async (id: number, address: string): Promise<boolean> => {
    const result: any = await pool.query('UPDATE user_profile SET address = ? WHERE user_id = ?', [address, id]);
    return result.affectedRows > 0;
}

const updateUserPhone = async (id: number, phone: string): Promise<boolean> => {
    const result: any = await pool.query('UPDATE user_profile SET phone_number = ? WHERE user_id = ?', [phone, id]);
    return result.affectedRows > 0;
}

const updateAllUserProfile = async (id: number, first_name: string, last_name: string, phone_number: number, address: string, bio: string, date_of_birth: Date): Promise<boolean> => {
    const result: any = await pool.query('UPDATE user_profile SET first_name = ?, last_name = ?, phone_number = ?, address = ?, bio = ?, date_of_birth = ? WHERE user_id = ?', [first_name, last_name, phone_number, address, bio, date_of_birth, id]);
    return result.affectedRows > 0;
}

//service for User
const createUserProfile = async (user_id: number): Promise<void> => {
    await pool.query('INSERT INTO user_profile (user_id) VALUES (?)', [user_id]);
}

const deleteUserProfile = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM user_profile WHERE user_id = ?', [id]);
}

export default {
    findProfileById,
    updateUserName,
    updateUserAddress,
    updateUserPhone,
    createUserProfile,
    deleteUserProfile,
    updateAllUserProfile
}