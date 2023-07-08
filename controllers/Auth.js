import UserModel from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await UserModel.findOne({
        where: {
            User: req.body.user
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const match = await argon2.verify(user.Password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    req.session.userId = user.User;
    const myUser = user.User;
    const name = user.Name;
    const role = user.Role;
    res.status(200).json({ myUser, name, role });
}


export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await UserModel.findOne({
        attributes: ['User','Name', 'Role'],
        where: {
            User: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json({ user });
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
}