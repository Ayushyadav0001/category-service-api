const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const serviceRoutes = require('./routes/service.routes');
const { verifyToken } = require('./middleware/auth.middleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/category', verifyToken, categoryRoutes);
app.use('/category', verifyToken, serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(`✅ Server is running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
  }
});
