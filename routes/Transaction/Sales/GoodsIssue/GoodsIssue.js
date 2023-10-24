import express from "express";
import { getGoodsIssue, createGoodsIssue, printGoodsissue, getGoodIssueDocNo, getDetailDocNo, getAllDocNo, deleteHeader, updateDetail, updateHeader, getTotalQty } from "../../../../controllers/Transaction/Sales/GoodsIssue/GoodIssue.js";

const router = express.Router();

router.patch("/printgoodsissue/:id", printGoodsissue);

router.get("/goodsissue/:id", getGoodsIssue);
router.get("/goodsissuedocno/:id", getGoodIssueDocNo);
router.post("/goodsissue", createGoodsIssue);
router.get("/goodsissuedetail/:id", getDetailDocNo);
router.get("/goodsissueall", getAllDocNo);
router.delete("/goodsissue/:id", deleteHeader);
router.patch("/goodsissueheader/:id", updateHeader);
router.patch("/goodsissuedetail/:id1/:id2", updateDetail);
router.get("/goodsissueqty/:id", getTotalQty);
export default router;
