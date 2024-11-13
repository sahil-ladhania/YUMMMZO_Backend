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

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log("Before Routes");
app.use(AuthRoutes);
app.use(RestaurantRoutes);
app.use(MenuRoutes);
app.use(OrderRoutes);
app.use(DeliveryRoutes);
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

app.listen(port, () => {
    console.log(`YUMMMZO listening on port ${port}`)
})
