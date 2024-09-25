import pool from '../../config/db';

const findProfileById = async (id: number) => {
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE user_id = ?', [id]);  
}

const updateUserName = async (id: number, name: string, lastname: string) => {
    const [result] = await pool.query('UPDATE user_profile SET name = ?, lastname = ? WHERE user_id = ?', [name, lastname, id]);
    return result;
}

const updateUserAddress = async (id: number, address: string) => {
    const [result] = await pool.query('UPDATE user_profile SET address = ? WHERE user_id = ?', [address, id]);
    return result;
}

const updateUserPhone = async (id: number, phone: string) => {
    const [result] = await pool.query('UPDATE user_profile SET phone = ? WHERE user_id = ?', [phone, id]);
    return result;
}

const updateAllUserProfile = async (id: number, first_name: string, last_name: string, phone_number: number, address: string, bio: string, date_of_birth: Date) => {
    const [result] = await pool.query('UPDATE user_profile SET first_name = ?, last_name = ?, phone_number = ?, address = ?, bio = ?, date_of_birth = ? WHERE user_id = ?', [first_name, last_name, phone_number, address, bio, date_of_birth, id]);
    return result;
}


//service for User
const createUserProfile = async (user_id: number) => {
    const [result] = await pool.query('INSERT INTO user_profile (user_id) VALUES (?)', [user_id]);
    return result;
}

const deleteUserProfile = async (id: number) => {
    const [result] = await pool.query('DELETE FROM user_profile WHERE user_id = ?', [id]);
    return result;
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