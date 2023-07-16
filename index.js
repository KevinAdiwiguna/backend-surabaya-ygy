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
import masterUnitConversion from "./routes/Master/Material/MasterUnitConversionRoutes.js"
import MasterSalesArea1 from './routes/Master/Customer/SalesArea/SalesArea1.js'
import MasterSalesArea2 from './routes/Master/Customer/SalesArea/SalesArea2.js'
import MasterSalesArea3 from './routes/Master/Customer/SalesArea/SalesArea3.js'
import MasterSalesman from "./routes/Master/MasterSalesman.js";
import MasterPriceRoutes from "./routes/Master/MasterPriceRoutes.js";
import salesOrderHeader from "./routes/Transaction/SalesOrderHeader.js";
import salesOrderDetail from "./routes/Transaction/SalesOrderDetail.js";

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
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const routes = [
  UserRoute,
  AuthRoute,
  MasterCurrencyRoute,
  MasterdocumentseriesRoute,
  MasterPricelistRoute,
  MasterLocationRoutes,
  MasterUnitRoutes,
  MasterCustomerGroupRoutes,
  MasterMaterialTypeRoutes,
  MasterCustomerRoute,
  MasterGroup1,
  MasterGroup2,
  MasterGroup3,
  MasterCountry,
  masterMaterial,
  masterUnitConversion,
  MasterSalesArea1,
  MasterSalesArea2,
  MasterSalesArea3,
  MasterSalesman,
  MasterPriceRoutes,
  salesOrderDetail,
  salesOrderHeader
];

routes.forEach((route) => {
  app.use(route);
});

store.sync();

app.get('/', (req, res) => {
  res.send("Hello there!");
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
