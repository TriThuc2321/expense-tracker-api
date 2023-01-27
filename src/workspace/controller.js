const pool = require('../../db');
const { getByUserIdQuery, addWorkspaceQuery, addWorkspaceDetailQuery } = require('./queries');

const getByUserEmail = (req, res) => {
    const { email } = req.params;
    pool.query(getByUserIdQuery, [email], (err, result) => {
        if (err) res.status(400).json(err);
        else if (result) {
            res.status(200).json(result.rows);
        } else return null;
    });
};

const addWorkspace = async (req, res) => {
    const { workspaceId, workspaceName, emails } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(addWorkspaceQuery, [workspaceId, workspaceName]);

        emails.forEach(async (email) => {
            await client.query(addWorkspaceDetailQuery, [workspaceId, email]);
        });

        await client.query('COMMIT');

        res.status(200).send({ message: 'Create workspace successfully!' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json(error);
    } finally {
        client.release();
    }
};

const addWorkspaceDetail = (req, res) => {
    const { workspaceId, userId } = req.body;

    pool.query(addWorkspaceDetailQuery, [workspaceId, userId], (error, result) => {
        if (error) res.status(400).json(error);
        else res.status(200).send({ message: 'Insert workspace detail successfully!' });
    });
};

module.exports = { getByUserEmail, addWorkspace, addWorkspaceDetail };
