import express from 'express'
import AuthRoutes from './routes/commonRoutes/AuthRoutes.js'
import RestaurantRoutes from "./routes/vendorRoutes/RestaurantRoutes.js";
import MenuRoutes from "./routes/vendorRoutes/MenuRoutes.js";
import OrderRoutes from "./routes/vendorRoutes/OrderRoutes.js";
import DeliveryRoutes from "./routes/courierRoutes/DeliveryRoutes.js";
import RestaurantFeedRoutes from "./routes/customerRoutes/RestaurantFeedRoutes.js";
import RestaurantFiltersRoutes from "./routes/customerRoutes/RestaurantFiltersRoutes.js";
import MenuFeedRoutes from "./routes/customerRoutes/MenuFeedRoutes.js";
import MenuFiltersRoutes from "./routes/customerRoutes/MenuFiltersRoutes.js";
import CartRoutes from "./routes/customerRoutes/CartRoutes.js";
import CheckoutRoutes from "./routes/customerRoutes/CheckoutRoutes.js";
import OrdersAndPaymentRoutes from "./routes/customerRoutes/OrdersAndPaymentRoutes.js";
import ReviewRoutes from "./routes/customerRoutes/ReviewRoutes.js";
import ItemRatingRoutes from "./routes/customerRoutes/ItemRatingRoutes.js";
import OrderHistoryRoutes from "./routes/customerRoutes/OrderHistoryRoutes.js";
import OrderTrackingRoutes from "./routes/customerRoutes/OrderTrackingRoutes.js";
import ScheduleOrdersRoutes from "./routes/customerRoutes/ScheduleOrdersRoutes.js";
import UserRoutes from "./routes/internalAdminRoutes/UserRoutes.js";
import CuisinesRoutes from "./routes/internalAdminRoutes/CuisinesRoutes.js";
import CuisineFeedRoutes from "./routes/customerRoutes/CuisineFeedRoutes.js";
import OpeningDaysRoutes from "./routes/customerRoutes/OpeningDaysRoutes.js";
import {errorHandler} from "./middlewares/errorHandeling/ErrorHandler.js";
import cors from "cors";

const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}))

console.log("Before Routes");
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(CuisinesRoutes)
app.use(RestaurantRoutes);
app.use(MenuRoutes);
app.use(OrderRoutes);
app.use(DeliveryRoutes);
app.use(CuisineFeedRoutes);
app.use(OpeningDaysRoutes);
app.use(RestaurantFeedRoutes);
app.use(RestaurantFiltersRoutes);
app.use(MenuFeedRoutes);
app.use(MenuFiltersRoutes);
app.use(CartRoutes);
app.use(CheckoutRoutes);
app.use(OrdersAndPaymentRoutes);
app.use(ReviewRoutes);
app.use(ItemRatingRoutes);
app.use(OrderHistoryRoutes);
app.use(OrderTrackingRoutes);
app.use(ScheduleOrdersRoutes);
console.log("After Routes");

app.use(errorHandler);

app.listen(port, () => {
    console.log(`YUMMMZO listening on port ${port}`)
})
