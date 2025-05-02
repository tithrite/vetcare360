const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config(); 

const ownerRoutes = require('./routes/owner.routes');
const petRoutes = require('./routes/pet.routes');
const visitRoutes = require('./routes/visit.routes');
const veterinarianRoutes = require('./routes/veterinarian.routes');

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/veterinarians', veterinarianRoutes);

app.get('/api', (req, res) => {
  res.send('API VetCare360 is running');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});