const pool = require('../../db');
const { getAllQuery, getByIdQuery, checkEmailExistQuery, addUserQuery } = require('./queries');

const getAll = (req, res) => {
    pool.query(getAllQuery, (err, result) => {
        if (err) res.status(400).json(err);

        if (result) {
            res.status(200).json(result.rows);
        } else return null;
    });
};

const getById = (req, res) => {
    const id = req.params.id;
    pool.query(getByIdQuery, [id], (err, result) => {
        if (err) res.status(400).json(err);
        res.status(200).json(result.rows);
    });
};

const addUser = (req, res) => {
    // console.log(req.body);
    const name = req.body.name ? req.body.name : 'User';
    const email = req.body.email ? req.body.email : 'User';
    const avatar = req.body.avatar
        ? req.body.avatar
        : 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';

    pool.query(checkEmailExistQuery, [email], (err, result) => {
        if (err) res.status(400).json(err);
        if (result.rows.length) res.send('Email already exists.');
        else {
            pool.query(addUserQuery, ['1', name, email, avatar], (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).send('Create account successfully!');
            });
        }
    });
};

module.exports = { getAll, getById, addUser };
