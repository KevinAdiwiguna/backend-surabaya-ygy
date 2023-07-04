import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

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

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

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
app.use(UserRoute);
app.use(AuthRoute);
app.use(MasterCurrencyRoute);
app.use(MasterdocumentseriesRoute);
app.use(MasterPricelistRoute);
app.use(MasterLocationRoutes);
app.use(MasterUnitRoutes);
app.use(MasterCustomerGroupRoutes);
app.use(MasterMaterialTypeRoutes);
app.use(MasterCustomerRoute);
app.use(MasterGroup1);
app.use(MasterGroup2);
app.use(MasterGroup3);

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
