import express from "express";

import { createPrice, deletePrice, getAllPrice, getPriceByCode, updatePrice, getPriceByMaterial } from "../../controllers/Master/MasterPrice.js";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get("/price", verifyUser, getAllPrice);
router.get("/pricematerial/:id", verifyUser, getPriceByMaterial);
router.patch("/price/:id/:id2/:id3/:id4/:id5/:id6", verifyUser, updatePrice);
router.post("/price", verifyUser, createPrice);
router.delete("/price/:id/:id2/:id3/:id4/:id5/:id6", verifyUser, deletePrice);
router.get("/price/:id/:id2/:id3/:id4/:id5/:id6", verifyUser, getPriceByCode);

export default router;
