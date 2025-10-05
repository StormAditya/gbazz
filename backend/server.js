const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

console.log('MONGO_URI from .env:', process.env.MONGO_URI); // ⬅️ Add this line

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const itemRoutes = require('./routes/itemRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected to the database'))
	.catch((err) => console.error(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});