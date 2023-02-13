const pool = require('../../db');
const {
    getListWpByEmailQuery,
    getListEmailsByWorkspaceIdQuery,
    checkWorkspaceExistedQuery,
    addWorkspaceQuery,
    addWorkspaceDetailQuery,
    deleteWorkspaceQuery,
    deleteWorkspaceDetailQuery,
    updateWorkspaceQuery,
    getWorkspaceQuery,
} = require('./queries');

const getListWpByUserEmail = (req, res) => {
    const { email } = req.params;
    pool.query(getListWpByEmailQuery, [email], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result) {
            res.status(200).json({ message: 'Get workspaces successfully!', status: 'SUCCESS', data: result.rows });
        }
    });
};

const getListEmailsByWorkspaceId = (req, res) => {
    const { workspaceId } = req.params;
    pool.query(getListEmailsByWorkspaceIdQuery, [workspaceId], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result) {
            res.status(200).json({
                message: 'Get email by workspaces successfully!',
                status: 'SUCCESS',
                data: result.rows,
            });
        }
    });
};

const getDetail = (req, res) => {
    const { workspaceId } = req.params;
    pool.query(getWorkspaceQuery, [workspaceId], (err, result) => {
        if (err) res.status(400).json({ message: err, status: 'FAIL' });
        else if (result && result.rows.length > 0) {
            let workspace = {
                workspaceId,
                workspaceName: result.rows[0].workspaceName,
                email: result.rows[0].email,
            };

            pool.query(getListEmailsByWorkspaceIdQuery, [workspaceId], (err, result) => {
                if (err) res.status(400).json({ message: err, status: 'FAIL' });
                else if (result) {
                    res.status(200).json({
                        message: 'Get email by workspaces successfully',
                        status: 'SUCCESS',
                        data: {
                            ...workspace,
                            users: result.rows,
                        },
                    });
                }
            });
        } else {
            res.status(200).json({
                message: 'Workspace does not exist',
                status: 'FAIL',
            });
        }
    });
};

const addWorkspace = async (req, res) => {
    const { workspaceId, workspaceName, emails, email } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(addWorkspaceQuery, [workspaceId, workspaceName, email]);

        emails.every(async (item) => {
            await client.query(addWorkspaceDetailQuery, [workspaceId, item]);
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

const deleteWorkspace = async (req, res) => {
    const { workspaceId } = req.params;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(deleteWorkspaceDetailQuery, [workspaceId]);
        await client.query(deleteWorkspaceQuery, [workspaceId]);

        await client.query('COMMIT');

        res.status(200).json({ message: 'Delete workspace successfully!', status: 'SUCCESS' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ message: error, status: 'FAIL' });
    } finally {
        client.release();
    }
};

const updateWorkspace = async (req, res) => {
    const client = await pool.connect();
    try {
        const { workspaceId, workspaceName, emails, email } = req.body;

        await client.query('BEGIN');

        const workspaceExist = await client.query(checkWorkspaceExistedQuery, [workspaceId]);
        if (workspaceExist.rows.length > 0) {
            await client.query(updateWorkspaceQuery, [workspaceId, workspaceName]);
            await client.query(deleteWorkspaceDetailQuery, [workspaceId]);
            emails.every(async (item) => {
                await client.query(addWorkspaceDetailQuery, [workspaceId, item]);
            });
            await client.query('COMMIT');

            res.status(200).json({ message: 'Update workspace successfully', status: 'SUCCESS' });
        } else {
            res.status(200).json({ message: 'Workspace does not exist', status: 'FAIL' });
        }
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ message: error, status: 'FAIL' });
    } finally {
        client.release();
    }
};

module.exports = {
    getListWpByUserEmail,
    getListEmailsByWorkspaceId,
    getDetail,
    addWorkspace,
    addWorkspaceDetail,
    deleteWorkspace,
    updateWorkspace,
};
