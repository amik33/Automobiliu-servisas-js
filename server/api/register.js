import express from 'express';
import { connection } from '../setupDb.js';
import { hash } from '../lib/hash.js';

export const register = express.Router();

register.post('/', async (req, res) => {
    const { fullname, email, password } = req.body;

    const minFullnameSize = 6;
    const maxFullnameSize = 60;
    const minEmailSize = 6;
    const maxEmailSize = 60;
    const minPasswordSize = 6;
    const maxPasswordSize = 60;

    if (typeof fullname !== 'string' || fullname.length < minFullnameSize) {
        errors.push({
            input:'fullname',
            msg: `Fullname too short. Minimum ${minFullnameSize} symbols required.`,
        })
    }

    if (typeof fullname !== 'string' || fullname.length > maxFullnameSize) {
        errors.push({
            input:'fullname',
            msg: `Fullname too long. Minimum ${maxFullnameSize} symbols required.`,
        })
    }

    if (typeof email !== 'string' || email.length < minEmailSize) {
        errors.push({
            input:'email',
            msg: `Email too short. Minimum ${minEmailSize} symbols required.`,
        })
    }

    if (typeof email !== 'string' || email.length > maxEmailSize) {
        errors.push({
            input:'email',
            msg: `Email too long. Minimum ${maxEmailSize} symbols required.`,
        })
    }

    if (typeof password !== 'string' || password.length < minPasswordSize) {
        errors.push({
            input:'password',
            msg: `Email too short. Minimum ${minPasswordSize} symbols required.`,
        })
    }

    if (typeof password !== 'string' || password.length > maxPasswordSize) {
        errors.push({
            input:'password',
            msg: `Email too long. Minimum ${maxPasswordSize} symbols required.`,
        })
    }


    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const selectRes = await connection.execute(selectQuery, [email]);
        const users = selectRes[0];

        if (users.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'email',
                        msg: 'User with such email already exists.'
                    }
                ]
            });
        }

        const insertQuery = `INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)`;
        const insertRes = await connection.execute(insertQuery, [fullname, email, hash(password)]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'User created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'User could not be created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: REGISTER API - server error.',
        });
    }
});

register.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Register" method' });
});