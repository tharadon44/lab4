const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const app = express();
const productRoutes = require('./routes/product'); 
app.use(express.json())

dotenv.config();//ต้องเรียกใช้.env

// ConnectDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Route
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));