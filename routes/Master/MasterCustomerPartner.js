import express from "express";

const router = express.Router();

import { createCustomerPartner, getAllCustomerPartner, getCustomerPartnerByCustomerCode, getCustomerPartnerByCode, deleteCustomerPartner } from "../../controllers/Master/MasterCustomerPartner.js";

router.get("/customerpartner", getAllCustomerPartner);
router.post("/customerpartner", createCustomerPartner);
router.delete("/customerpartner/:id", deleteCustomerPartner);
router.get("/customerpartner/:id", getCustomerPartnerByCustomerCode);
router.get("/customerpartner/:id/:id2", getCustomerPartnerByCode);

export default router;
