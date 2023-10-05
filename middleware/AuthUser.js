import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await User.findOne({
        where: {
            User: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.role = user.Role;
    req.myUser = user.User;
    req.name = user.Name;
    req.role = user.Role;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            User: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if (user.Role !== "administrator") return res.status(403).json({ msg: "Akses terlarang" });
    next();
}
