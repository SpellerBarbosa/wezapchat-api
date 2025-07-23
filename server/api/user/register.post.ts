import { sql } from "~/utils/db/connectToDB";
import { hashPassword } from "~/utils/common/bcrypt";
import { readBody } from "#imports";

export default defineEventHandler(async (event) => {
  const { username, name, password, role } = await readBody(event);
  if (!username || !name || !password || !role) {
    throw createError({
      statusCode: 400,
      statusMessage: "Preencha todos os campos",
    });
  }

  try {
    const usernamerExist =
      await sql`SELECT 1 FROM users WHERE username = ${username} LIMIT 1`;

    if (usernamerExist.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Usuario ja cadastrado no banco de dados",
      });
    }

    const hash = await hashPassword(password);

    const newUser = await sql`
            INSERT INTO users (username, name, password, role) VALUES (${username}, ${name}, ${hash}, ${role})
            `;
    return { message: "usuario cadastrado com sucesso" };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: "Servidor indisponivel tente novamente mais tarde",
    });
  }
});
