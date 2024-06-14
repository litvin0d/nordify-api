import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (!fullName || !username || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "Заполните все поля" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Пароли не совпадают" });
		}

		const user = await prisma.user.findUnique({ where: { username } });

		if (user) {
			return res.status(409).json({ error: "Имя пользователя уже занято" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = await prisma.user.create({
			data: {
				fullName,
				username,
				password: hashedPassword,
				gender,
				profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
			},
		});

		if (newUser) {
			// generate token in a sec
			generateToken(newUser.id, res);

			res.status(201).json({
				id: newUser.id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Некорректные данные пользователя" });
		}
	} catch (error: any) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			return res.status(401).json({ error: "Неверный логин или пароль" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Неверный логин или пароль" });
		}

		generateToken(user.id, res);

		res.status(200).json({
			id: user.id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error: any) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
};
export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Успешный выход из аккаунта" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
};

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({ where: { id: req.user.id } });

		if (!user) {
			return res.status(404).json({ error: "Пользователь не найден" });
		}

		res.status(200).json({
			id: user.id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
};
