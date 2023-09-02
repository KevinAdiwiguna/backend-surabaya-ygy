import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
dotenv.config();

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MasterCurrencyRoute from "./routes/Master/Customer/MasterCurrencyRoute.js";
import MasterdocumentseriesRoute from "./routes/Master/MasterDocumentSeries.js";
import MasterPricelistRoute from "./routes/Master/Customer/MasterPricelistType.js";
import MasterLocationRoutes from "./routes/Master/MasterLocationRoutes.js";
import MasterUnitRoutes from "./routes/Master/Material/MasterUnitRoutes.js";
import MasterCustomerGroupRoutes from "./routes/Master/Customer/MasterCustomerGroup.js";
import MasterMaterialTypeRoutes from "./routes/Master/Material/MasterMaterialType.js";
import MasterCustomerRoute from "./routes/Master/Customer/MasterCustomerRoutes.js";
import MasterGroup1 from "./routes/Master/Material/MaterialGroup/MaterialGroup1.js";
import MasterGroup2 from "./routes/Master/Material/MaterialGroup/MaterialGroup2.js";
import MasterGroup3 from "./routes/Master/Material/MaterialGroup/MaterialGroup3.js";
import MasterCountry from "./routes/Master/Customer/MasterCountry.js";
import masterMaterial from "./routes/Master/Material/MasterMaterial.js";
import masterUnitConversion from "./routes/Master/Material/MasterUnitConversionRoutes.js";
import MasterSalesArea1 from "./routes/Master/Customer/SalesArea/SalesArea1.js";
import MasterSalesArea2 from "./routes/Master/Customer/SalesArea/SalesArea2.js";
import MasterSalesArea3 from "./routes/Master/Customer/SalesArea/SalesArea3.js";
import MasterSalesman from "./routes/Master/MasterSalesman.js";
import MasterPrice from "./routes/Master/MasterPriceRoutes.js";
import MasterSupplier from "./routes/Master/MasterSupplierRoutes.js";
import MasterDepartment from "./routes/Master/MasterDepartmentRoutes.js";
import SalesOrderHeader from "./routes/Transaction/Sales/SalesOrder/SalesOrderHeader.js";
import SalesOrderDetail from "./routes/Transaction/Sales/SalesOrder/SalesOrderDetail.js";
import PurhaseRequestHeader from "./routes/Transaction/Purchase/PurchaseRequestHeader.js";
import PurchaseRequestDetail from "./routes/Transaction/Purchase/PurchaseRequestDetail.js";
import PurchaseOrderHeader from "./routes/Transaction/Purchase/PurchaseOrderHeader.js";
import PurchaseOrderDetail from "./routes/Transaction/Purchase/PurchaseOrderDetail.js";
import PurchaseCostHeader from "./routes/Transaction/Purchase/PurchaseCostHeader.js";
import PurchaseCostDetail from "./routes/Transaction/Purchase/PurchaseCostDetail.js";
import MasterPeriode from "./routes/Master/MasterPeriode.js";
import MasterApproval from "./routes/Master/MasterApproval.js";
import MasterBomh from "./routes/Master/Production/BOM/MasterBomhRoutes.js";
import MasterBomd from "./routes/Master/Production/BOM/MasterBomdRoutes.js";
import MasterBomCoProduct from "./routes/Master/Production/BOM/MasterBomCoProductRoutes.js";
import MasterDownTimeReason from "./routes/Master/Production/MasterDownTimeReasonRoutes.js";
import GoodIssue from "./routes/Transaction/Sales/GoodsIssue/GoodsIssue.js";
import JobOrder from "./routes/Transaction/Production/JobOrder.js";
import SalesInvoice from "./routes/Transaction/Sales/SalesInvoice/SalesInvoice.js";
import GoodReceiptHeader from "./routes/Transaction/Purchase/GoodReceiptHeader.js";
import GoodReceiptDetail from "./routes/Transaction/Purchase/GoodReceiptDetail.js";
import GenerateTaxNo from "./routes/Master/MasterGenerateTaxNoRoutes.js";
import MasterMachine from "./routes/Master/Production/MasterMachIneRoutes.js";
import WOrderTemplateD from "./routes/Master/Production/MasterWOrderTemplateDRoutes.js";
import WOrderTemplateH from "./routes/Master/Production/MasterWOrderTemplateH.js";


dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.1.64:3000"],
  })
);

app.use(express.json());


const routes = [SalesInvoice, UserRoute, AuthRoute, MasterCurrencyRoute, MasterdocumentseriesRoute, MasterPricelistRoute, MasterLocationRoutes, MasterUnitRoutes, MasterCustomerGroupRoutes, MasterMaterialTypeRoutes, MasterCustomerRoute, MasterGroup1, MasterGroup2, MasterGroup3, MasterCountry, masterMaterial, masterUnitConversion, MasterSalesArea1, MasterSalesArea2, MasterSalesArea3, MasterSalesman, MasterPrice, MasterSupplier, MasterDepartment, SalesOrderDetail, SalesOrderHeader, PurhaseRequestHeader, PurchaseRequestDetail, PurchaseOrderHeader, PurchaseOrderDetail, PurchaseCostHeader, PurchaseCostDetail, MasterPeriode, MasterApproval, MasterBomh, MasterBomd, MasterBomCoProduct, MasterDownTimeReason, GoodIssue, JobOrder, GoodReceiptHeader, GoodReceiptDetail, GenerateTaxNo,
  MasterMachine, WOrderTemplateD, WOrderTemplateH];
routes.forEach((route) => {
  app.use(route);
});

store.sync();

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
