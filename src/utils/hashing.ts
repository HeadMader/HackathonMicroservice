import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust salt rounds based on security needs
  return await bcrypt.hash(password, saltRounds);
};