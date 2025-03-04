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
import OrderSummaryAndRating from "./routes/customerRoutes/OrderSummaryAndRating.js"
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
app.use(AuthRoutes); 
app.use(UserRoutes); 
app.use(CuisineFeedRoutes);
app.use(TopBrandsFeedRoutes); 
app.use(CuisinesRoutes);
app.use(OpeningDaysRoutes); 
app.use(RestaurantRoutes); 
app.use(RestaurantFeedRoutes); 
app.use(RestaurantFiltersRoutes);
app.use(MenuRoutes); 
app.use(MenuFeedRoutes); 
app.use(MenuFiltersRoutes); 
app.use(AddressRoutes);
app.use(OrdersAndPaymentRoutes);
app.use(OrderRoutes); 
app.use(DeliveryRoutes); 
app.use(OrderSummaryAndRating);
console.log("After Routes");

app.use(errorHandler);

app.listen(port, () => {
    console.log(`YUMMMZO listening on port ${port}`)
})