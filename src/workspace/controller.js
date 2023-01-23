const pool = require('../../db');
const { getByUserIdQuery, addWorkspaceQuery } = require('./queries');

const getByUserId = (req, res) => {
    const { userId } = req.params;
    pool.query(getByUserIdQuery, [userId], (err, result) => {
        if (err) res.status(400).json(err);
        else if (result) {
            res.status(200).json(result.rows);
        } else return null;
    });
};

const addWorkspace = (req, res) => {
    const { workspaceId, workspaceName } = req.body;

    pool.query(addWorkspaceQuery, [workspaceId, workspaceName], (error, result) => {
        if (error) res.status(400).json(error);
        else res.status(200).send('Create workspace successfully!');
    });
};

module.exports = { getByUserId, addWorkspace };
