import { z } from "zod";

const usernameSchema = z.string().trim().min(3);
const emailSchema = z.string().trim().email();
const passwordSchema = z.string().min(8);
const profilePictureSchema = z.string().url().optional();

export const signupSchema = z.object({
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
	profilePicture: profilePictureSchema,
});

export const signinSchema = z.object({
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
});
