import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Erro ao gerar o hash da senha",
    });
  }
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Senha invalida.",
    });
  }
};
