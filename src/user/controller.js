const pool = require('../../db');
const { getAllQuery, getByEmailQuery, checkEmailExistQuery, addUserQuery } = require('./queries');

const getAll = (req, res) => {
    pool.query(getAllQuery, (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result) {
            if (result) res.status(200).json(result.rows);
        } else return null;
    });
};

const getByEmail = (req, res) => {
    const email = req.params.email;
    pool.query(getByEmailQuery, [email], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else {
            result.rows.length
                ? res.status(200).json({ status: 'SUCCESS', data: result.rows[0] })
                : res.status(200).json({ status: 'SUCCESS', data: null });
        }
    });
};

const checkEmailExisted = (req, res) => {
    const { email } = req.params;

    pool.query(checkEmailExistQuery, [email], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else res.status(200).json({ status: 'SUCCESS', message: result.rows.length != 0 });
    });
};

const addUser = (req, res) => {
    const userId = req.body.userId;
    const fullName = req.body.fullName ? req.body.fullName : 'User';
    const email = req.body.email ? req.body.email : 'User';
    const picture = req.body.picture
        ? req.body.picture
        : 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';

    pool.query(checkEmailExistQuery, [email], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result.rows.length) res.send('Email already exists.');
        else {
            pool.query(addUserQuery, [userId, fullName, email, picture], (error, result) => {
                if (error) res.status(400).json({ message: error, status: 'FAIL' });
                else res.status(200).json({ message: 'Create account successfully!', status: 'SUCCESS' });
            });
        }
    });
};

module.exports = { getAll, getByEmail, addUser, checkEmailExisted };
