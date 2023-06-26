import menuModel from "../models/MenuModel.js";

export const getMenuModel = async (req, res) => {
    try {
        const response = await menuModel.findAll({
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createMenuModel = async (req, res) => {
    const { user_data, category } = req.body
    try {
        const response = await menuModel.create({
            user_data: user_data,
            category: category
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(301).json({message: "udah ada anjing"}) 
    }
}