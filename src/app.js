import express from 'express'
import AuthRoutes from './routes/commonRoutes/AuthRoutes.js';
import AddressRoutes from "./routes/customerRoutes/AddressRoutes.js";
import RestaurantRoutes from "./routes/vendorRoutes/RestaurantRoutes.js";
import MenuRoutes from "./routes/vendorRoutes/MenuRoutes.js";
import OrderRoutes from "./routes/vendorRoutes/OrderRoutes.js";
import DeliveryRoutes from "./routes/courierRoutes/DeliveryRoutes.js";
import RestaurantFeedRoutes from "./routes/customerRoutes/RestaurantFeedRoutes.js";
import RestaurantFiltersRoutes from "./routes/customerRoutes/RestaurantFiltersRoutes.js";
import MenuFeedRoutes from "./routes/customerRoutes/MenuFeedRoutes.js";
import MenuFiltersRoutes from "./routes/customerRoutes/MenuFiltersRoutes.js";
import OrdersAndPaymentRoutes from "./routes/customerRoutes/OrdersAndPaymentRoutes.js";
import UserRoutes from "./routes/internalAdminRoutes/UserRoutes.js";
import CuisinesRoutes from "./routes/internalAdminRoutes/CuisinesRoutes.js";
import CuisineFeedRoutes from "./routes/customerRoutes/CuisineFeedRoutes.js";
import OpeningDaysRoutes from "./routes/customerRoutes/OpeningDaysRoutes.js";
import TopBrandsFeedRoutes from "./routes/customerRoutes/TopBrandsFeedRoutes.js"
import {errorHandler} from "./middlewares/errorHandeling/ErrorHandler.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";

const app = express()
const port = 3000

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}))

console.log("Before Routes");
app.use(AuthRoutes); // Flow will start from here...
app.use(UserRoutes); // Flow will start from here...
app.use(CuisineFeedRoutes); // Flow will start from here...
app.use(TopBrandsFeedRoutes); // Flow will start from here...
app.use(CuisinesRoutes); // Flow will start from here...
app.use(OpeningDaysRoutes); // Flow will start from here...
app.use(RestaurantRoutes); // Flow will start from here...
app.use(RestaurantFeedRoutes); // Flow will start from here...
app.use(RestaurantFiltersRoutes); // Flow will start from here...
app.use(MenuRoutes); // Flow will start from here...
app.use(MenuFeedRoutes); // Flow will start from here...
app.use(MenuFiltersRoutes); // Flow will start from here...
app.use(AddressRoutes); // Flow will start from here...
app.use(OrdersAndPaymentRoutes); // Flow will start from here...
app.use(OrderRoutes); // Flow will start from here...
app.use(DeliveryRoutes); // Flow will start from here...
console.log("After Routes");

app.use(errorHandler);

app.listen(port, () => {
    console.log(`YUMMMZO listening on port ${port}`)
})