const pool = require('../../db');
const { getByUserIdQuery, addWorkspaceQuery, addWorkspaceDetailQuery } = require('./queries');

const getByUserEmail = (req, res) => {
    const { email } = req.params;
    pool.query(getByUserIdQuery, [email], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result) {
            res.status(200).json({ message: 'Create workspace successfully!', status: 'SUCCESS', data: result.rows });
        }
    });
};

const addWorkspace = async (req, res) => {
    const { workspaceId, workspaceName, emails } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(addWorkspaceQuery, [workspaceId, workspaceName]);

        emails.every(async (email) => {
            await client.query(addWorkspaceDetailQuery, [workspaceId, email]);
        });

        await client.query('COMMIT');

        res.status(200).json({ message: 'Create workspace successfully!', status: 'SUCCESS' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ message: error, status: 'FAIL' });
    } finally {
        client.release();
    }
};

const addWorkspaceDetail = (req, res) => {
    const { workspaceId, userId } = req.body;

    pool.query(addWorkspaceDetailQuery, [workspaceId, userId], (error, result) => {
        if (error) res.status(400).json({ message: error, status: 'FAIL' });
        else res.status(200).send({ message: 'Insert workspace detail successfully!' });
    });
};

module.exports = { getByUserEmail, addWorkspace, addWorkspaceDetail };
