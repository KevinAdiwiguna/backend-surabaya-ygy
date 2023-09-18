import Stock from '../../models/Report/Stock.js'

export const getStockByLocation = async (req, res) => {
try {
   const response = await Stock.findAll({
      where: {
        Location: req.params.id
      }
    })
  res.status(200).json(response)
} catch (error) {
  res.status(500).json({msg: error.message})
}
}