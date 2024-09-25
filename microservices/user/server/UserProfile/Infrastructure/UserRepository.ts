import pool from '../../config/db';

const findAllProfiles = async () => {
  const [rows] = await pool.query('SELECT * FROM userprofiles');
  return rows;
};

const createProfile = async (user_id: number, first_name: string, last_name: string, phone_number: string) => {
  const [result] = await pool.query(
    'INSERT INTO userprofiles (user_id, first_name, last_name, phone_number) VALUES (?, ?, ?, ?)',
    [user_id, first_name, last_name, phone_number]
  );
  return result;
};

const findProfilesLimit = async (limit: number) => {
  const [rows] = await pool.query('SELECT * FROM userprofiles LIMIT ?', [limit]);
  return rows;
}

const findProfileById = async (id: number) => {
  const [profile] = await pool.query('SELECT * FROM userprofiles WHERE id = ?', [id]);
  return profile;
}

const findByEmail = async (email: string) => {
  const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return user;
}

export default {
  findAllProfiles,
  createProfile,
  findProfilesLimit,
  findProfileById,
  findByEmail
};
