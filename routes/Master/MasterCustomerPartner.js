import express from "express";

const router = express.Router();

import {createCustomerPartner,getAllCustomerPartner} from "../../controllers/Master/MasterCustomerPartner.js";

router.get("/customerpartner", getAllCustomerPartner);
router.post("/customerpartner", createCustomerPartner);

export default router;
