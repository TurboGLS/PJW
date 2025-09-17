// import 'reflect-metadata';

// usato per gestire tutte le variabili presenti nel file .env a livello globale quando parte il servizio
// import dotenv from 'dotenv';
// dotenv.config();

import app from './app';
import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/local')
  .then(() => {
    console.log('Connected to db');
    const PORT = process.env.PORT || 3000;
    app.listen(Number(PORT), () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
