const express = require('express');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const app = express();


//================= Middlewares ===================

app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));




//================= # Routing # =================

//================ Product routes=================

app.use('/api/v1/products', productRouter);

//================= User routes =================

app.use('/api/v1/users', userRouter);


module.exports = app;