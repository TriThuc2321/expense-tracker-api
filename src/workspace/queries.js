const getListWpByEmailQuery =
    'select w."workspaceId", w."workspaceName" from public.workspace w join public."workspaceDetail" wdt on w."workspaceId" = wdt."workspaceId" where wdt.email = $1';
const getListEmailsByWorkspaceIdQuery =
    'select u.* from public.user u join public."workspaceDetail" wdt on u."email" = wdt."email" where wdt."workspaceId" = $1';
const getWorkspaceQuery = 'select * from workspace where "workspaceId" = $1';
const checkWorkspaceExistedQuery = 'select * from workspace where "workspaceId" = $1';

const addWorkspaceQuery = 'insert into public.workspace ("workspaceId", "workspaceName", "email") values ($1, $2, $3)';
const addWorkspaceDetailQuery = 'insert into public."workspaceDetail" ("workspaceId", "email") values ($1, $2)';

const updateWorkspaceQuery = 'UPDATE "public"."workspace" SET "workspaceName" = $2 WHERE "workspaceId" = $1';

const deleteWorkspaceQuery = 'delete from public."workspace" where "workspaceId" = $1';
const deleteWorkspaceDetailQuery = 'delete from public."workspaceDetail" where "workspaceId" = $1';

module.exports = {
    getListEmailsByWorkspaceIdQuery,
    getListWpByEmailQuery,
    getWorkspaceQuery,
    checkWorkspaceExistedQuery,
    addWorkspaceQuery,
    addWorkspaceDetailQuery,
    updateWorkspaceQuery,
    deleteWorkspaceQuery,
    deleteWorkspaceDetailQuery,
};
