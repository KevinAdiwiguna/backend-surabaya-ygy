import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllGoodIssueh = async (req,res) => {
    try {
        const response = await GoodIssueh.findAll()
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})        
    }
}

export const createGoodIssue

