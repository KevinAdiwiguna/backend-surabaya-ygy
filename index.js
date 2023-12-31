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
import MasterMachine from "./routes/Master/Production/MasterMachineRoutes.js";
import WOrderTemplateD from "./routes/Master/Production/MasterWOrderTemplateDRoutes.js";
import WOrderTemplateH from "./routes/Master/Production/MasterWOrderTemplateH.js";
import TransactionType from "./routes/Master/ARAP/TransactionType/TransactionType.js";
import Collector from "./routes/Master/ARAP/Collector/Collector.js";
import Account from "./routes/Master/GL/MasterAccount.js";
import Cashflowd from "./routes/Master/GL/MasterCashflowd.js";
import SupplierPartner from "./routes/Master/MasterSupplierPartner.js";
import MasterBank from "./routes/Master/ARAP/Bank/MasterBank.js";
import ExchangeRate from "./routes/Master/ARAP/ExchangeRate/MasterExchangeRate.js";
import Cflowh from "./routes/Master/GL/MasterCashflowh.js";
import Budgetd from "./routes/Master/GL/MasterBudgetd.js";
import Budgeth from "./routes/Master/GL/MasterBudgeth.js";
import PurchaseReturnHeader from "./routes/Transaction/Purchase/PurchaseReturnHeader.js";
import PurchaseReturnDetail from "./routes/Transaction/Purchase/PurchaseReturnDetail.js";
import MasterCustomerPartner from "./routes/Master/MasterCustomerPartner.js";
import Stock from './routes/Report/Stock.js'
import MasterGenterateTaxNo from './routes/Master/MasterGenerateTaxNoRoutes.js'
import ARRequestList from './routes/Transaction/Account Receivable/AR_RequestList/AR_RequestList.js'
import APReceiptList from './routes/Transaction/Account Payable/AP_ReceiptList.js'
import CustomerPaymentD from './routes/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
import ARSettlement from "./routes/Transaction/Account Receivable/ARSettlement/ARSettlement.js";
import CashierReceipt from './routes/Transaction/BKM/CashierReceipt.js'
import DebtPayment from './routes/Transaction/Account Payable/DebtPayment.js'
import APSettlement from './routes/Transaction/Account Payable/APSettlement.js'
import AjustmentIn from './routes/Transaction/InternalTransaction/AdjustmentIn/AdjustmentIn.js'
import StockBalance from './routes/Report/StockBalance.js'
import PurchaseInvoice from './routes/Transaction/Purchase/PurchaseInvoice/PurchaseInvoice.js'
import CashierPayment from './routes/Transaction/BKK/CashierPayment.js'
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
      sameSite: 'strict',
      // secure: true,
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","http://localhost:3002", "http://192.168.1.76:3000", 'http://192.168.1.68:3000'],
  })
);

app.use(express.json());

const routes = [CustomerPaymentD, PurchaseInvoice, CashierReceipt, ARSettlement, Collector, Stock, ARRequestList, MasterGenterateTaxNo, MasterCustomerPartner, SalesInvoice, UserRoute, AuthRoute, MasterCurrencyRoute, MasterdocumentseriesRoute, MasterPricelistRoute, MasterLocationRoutes, MasterUnitRoutes, MasterCustomerGroupRoutes, MasterMaterialTypeRoutes, MasterCustomerRoute, MasterGroup1, MasterGroup2, MasterGroup3, MasterCountry, masterMaterial, masterUnitConversion, MasterSalesArea1, MasterSalesArea2, MasterSalesArea3, MasterSalesman, MasterPrice, MasterSupplier, MasterDepartment, SalesOrderDetail, SalesOrderHeader, PurhaseRequestHeader, PurchaseRequestDetail, PurchaseOrderHeader, PurchaseOrderDetail, PurchaseCostHeader, PurchaseCostDetail, MasterPeriode, MasterApproval, MasterBomh, MasterBomd, MasterBomCoProduct, MasterDownTimeReason, GoodIssue, JobOrder, GoodReceiptHeader, GoodReceiptDetail, GenerateTaxNo, MasterMachine, WOrderTemplateD, WOrderTemplateH, TransactionType, Account, Cashflowd, SupplierPartner, MasterBank, ExchangeRate, Cflowh, Budgetd, Budgeth, PurchaseReturnHeader, PurchaseReturnDetail, APReceiptList, DebtPayment, APSettlement, AjustmentIn, StockBalance, CashierPayment];


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
