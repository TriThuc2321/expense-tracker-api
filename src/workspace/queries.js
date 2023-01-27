const getAllQuery = 'SELECT * FROM "public"."workspace"';
const getByIdQuery = 'SELECT * FROM "public"."workspace" WHERE id = $1';
const getByUserIdQuery =
    'select * from public.workspace w where w."workspaceId" in (select w2."workspaceId" from public."workspaceDetail" w2 where w2."email" = $1)';

const addWorkspaceQuery = 'insert into public.workspace ("workspaceId", "workspaceName") values ($1, $2)';
const addWorkspaceDetailQuery = 'insert into public."workspaceDetail" ("workspaceId", "email") values ($1, $2)';

const updateWorkspaceQuery = 'UPDATE "public"."workspace" SET workspaceName = $2 WHERE workspaceId = $1';

const deleteWorkspaceQuery = 'DELETE "public"."workspace" WHERE workspaceId = $1';
const deleteWorkspaceDetailQuery = 'delete public.workspace detail where workspaceId = $1 and userId = $2';

module.exports = {
    getAllQuery,
    getByIdQuery,
    getByUserIdQuery,
    addWorkspaceQuery,
    addWorkspaceDetailQuery,
    updateWorkspaceQuery,
    deleteWorkspaceQuery,
    deleteWorkspaceDetailQuery,
};
