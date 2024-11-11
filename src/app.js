import express from 'express'
import AuthRoutes from './routes/commonRoutes/AuthRoutes.js'
import RestaurantRoutes from "./routes/vendorRoutes/RestaurantRoutes.js";
import MenuRoutes from "./routes/vendorRoutes/MenuRoutes.js";
import OrderRoutes from "./routes/vendorRoutes/OrderRoutes.js";
import DeliveryRoutes from "./routes/courierRoutes/DeliveryRoutes.js";
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

app.listen(port, () => {
    console.log(`YUMMMZO listening on port ${port}`)
})
