import StockBalance from '../../models/Report/StockBalance.js'
export const getStockBalance = async (req, res) => {
  try {
    const response = await StockBalance.findAll()
    res.json(response)
  } catch (error) {

  }
}