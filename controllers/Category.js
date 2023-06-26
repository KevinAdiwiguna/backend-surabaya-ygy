import categoryModel from "../models/CategoryModel.js";

export const getCategory = async (req, res) => {
    try {
        const response = await categoryModel.findAll({
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createCategory = async (req, res) => {
    const { category } = req.body
    try {
        const response = await categoryModel.create({
            category: category
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(301).json({message: "udah ada anjing"}) 
    }
}