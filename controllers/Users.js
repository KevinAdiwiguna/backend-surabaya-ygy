import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['User', 'Name', 'Role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['User', 'Name', 'Role'],
            where: {
                User: req.params.id
            }
        });
        if (response === null) return res.status(404).json({ msg: "User tidak ditemukan" })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { user, name, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const userCheck = await User.findOne({
        where: {
            User: user
        }
    })
    if (userCheck) return res.status(400).json({ msg: "User sudah ada" })
    // const hashPassword = await argon2.hash(password, { hashLength: 4 });
    try {
        await User.create({
            User: user,
            Name: name,
            Password: password,
            Role: role
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createAdmin = async (req, res) => {
    const { user, name, password, confPassword, role, code } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    if (code !== "DRJUIRGVTRRNVGTNGRHIJU") return res.status(400).json({ msg: "Code tidak cocok" });
    const userCheck = await User.findOne({
        where: {
            User: user
        }
    })
    if (userCheck) return res.status(400).json({ msg: "User sudah ada" })

    // const saltRounds = 10;
    // const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        await User.create({
            User: user,
            Name: name,
            Password: password,
            Role: role
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updatePassword = async (req, res) => {
    const { password, confPassword } = req.body;
    const getMyData = await User.findOne({
        where: {
            User: req.params.id
        }
    });
    if (!getMyData) return res.status(404).json({ msg: "User tidak ditemukan" });
    if (getMyData.Password !== req.body.oldPassword) return res.status(400).json({ msg: "Password lama salah" })

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }
    try {
        const user = await User.findOne({
            where: {
                User: getMyData.User
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "User tidak ditemukan" });
        }

        // const hashPassword = await argon2.hash(password);

        await User.update({
            Password: password
        }, {
            where: {
                User: getMyData.User
            }
        });

        res.status(200).json({ msg: "Password Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            User: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await User.destroy({
            where: {
                User: user.User
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
