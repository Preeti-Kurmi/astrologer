const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const astrologerRoutes = require('./routes/astrologerRoutes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', astrologerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
