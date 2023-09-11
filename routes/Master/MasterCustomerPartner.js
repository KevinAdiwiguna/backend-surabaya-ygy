import express from "express";

const router = express.Router();

import { createCustomerPartner, getAllCustomerPartner, getCustomerPartnerByCustomerCode, getCustomerPartnerByCode } from "../../controllers/Master/MasterCustomerPartner.js";

router.get("/customerpartner", getAllCustomerPartner);
router.post("/customerpartner", createCustomerPartner);
router.get("/customerpartner/:id", getCustomerPartnerByCustomerCode);
router.get("/customerpartner/:id/:id2", getCustomerPartnerByCode);

export default router;
