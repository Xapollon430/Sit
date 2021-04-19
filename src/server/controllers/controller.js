import User from "../database/models/User";
import HttpError from "../error/HttpError";
import jwt from "jsonwebtoken";
import { AES } from "crypto-js";
import { config } from "dotenv";
config();

const monthToMiliseconds = 30 * 24 * 60 * 60 * 1000;

export const signUp = async (req, res) => {
  try {
    const signUpData = req.body;
    let userExists = await User.findOne({ email: signUpData.email });
    if (userExists) return res.status(409).send("Email is already in use!");

    let newUser = new User(signUpData);

    let { refreshToken, accessToken } = newUser.generateTokens();
    await newUser.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: monthToMiliseconds,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production" ? true : false,
    });

    res.json({ user: newUser, accessToken });
  } catch (e) {
    return res.status(500).send("Something went wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let foundUser = await User.findOne({ email });
    if (!foundUser || password !== foundUser.password) {
      return res.status(401).send("Wrong password or email!");
    }
    let { refreshToken, accessToken } = foundUser.generateTokens();
    res.cookie("refreshToken", refreshToken, {
      maxAge: monthToMiliseconds,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production" ? true : false,
    });

    res.status(200).json({
      user: foundUser,
      accessToken,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something went wrong!");
  }
};

export const autoLogin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(token.id);
    const accessToken = user.generateAccessToken();
    res.status(200).json({ accessToken, user });
  } catch (e) {
    return res.status(400).send("Couldn't log in!");
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json("Succesfully logged out!");
  } catch (e) {
    return res.status(400).send("Couldn't log out!");
  }
};

export const uploadProfilePicture = async (req, res) => {
  console.log(req.file.buffer.toString());
  AES.encrypt(req.file.buffer.toString(), );
};
