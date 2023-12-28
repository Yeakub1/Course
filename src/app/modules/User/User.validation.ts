import { z } from 'zod';

const passwordValidation = z
  .string({ required_error: 'password is required' })
  .refine(
    (password): password is string => {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      return regex.test(password);
    },
    {
      message:
        'Password must contain at least one uppercase letter, one special character, one number, and be at least 6 characters long.',
    },
  );

const createuserValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required.' }),
    email: z.string({ required_error: 'email is required.' }).email(),
    role: z.string({ required_error: 'role is required.' }),
    password: passwordValidation,
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'UserName is required.' }),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});

const passwordChangeValidation = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'currentPassword is required.',
    }),
    newPassword: z.string({ required_error: 'newPassword is required.' }),
  }),
});

export const userValidation = {
  createuserValidationSchema,
  loginValidationSchema,
  passwordChangeValidation,
};
