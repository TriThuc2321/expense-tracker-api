const getAllQuery = 'SELECT * FROM "public"."user"';
const getByIdQuery = 'SELECT * FROM "public"."user" WHERE userId = $1';
const checkEmailExistQuery = 'SELECT u FROM "public"."user" u WHERE u.email = $1';
const addUserQuery = 'INSERT INTO "public"."user" ("userId", "fullName", "email", "picture") VALUES ($1, $2, $3, $4)';
const updateUserQuery = 'UPDATE "public"."user" SET name = $2, avatar = $3 WHERE userId = $1';
const deleteUserQuery = 'DELETE "public"."user" WHERE userId = $1';

module.exports = { getAllQuery, getByIdQuery, checkEmailExistQuery, addUserQuery, updateUserQuery, deleteUserQuery };
