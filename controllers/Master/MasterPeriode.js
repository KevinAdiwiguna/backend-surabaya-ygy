import MasterPeriode from "../../models/Master/MasterPeriode.js";

export const createPeriode = async (req, res) => {
    const { periode, createdBy, changedBy } = req.body;

    const validation = await MasterPeriode.findOne({
        where: {
            Periode: periodes
        }
    })
    if (validation) return res.status(400).json({ message: "periode udah ada" })
    try {
        await MasterPeriode.create({
            Periode: periode,
            IsClosed: false,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const closePeriode = async (req, res) => {
    const periode = await MasterPeriode.findOne({
        where: {
            Periode: req.params.id
        }
    });
    try {
        await periode.update({ IsClosed: true });
        res.status(201).json({ msg: "update Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
