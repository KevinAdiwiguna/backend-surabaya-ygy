import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan", statusCode: 404 });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password", statusCode: 400 });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const role = user.role;
    res.status(200).json({ uuid, username, role });
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!", statusCode: 401, authenticated: false });
    }
    const user = await User.findOne({
        attributes: ['uuid', 'username', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.json({ msg: "User tidak ditemukan", statusCode: 404 });
    res.status(200).json({user, authenticated: false});
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.json({ msg: "Tidak dapat logout", statusCode: 400 });
        res.status(200).json({ msg: "Anda telah logout" });
    });
}