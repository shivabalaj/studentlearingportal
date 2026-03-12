const mongoose = require('mongoose');

const uri = 'mongodb://chandrashekar:balaji123b@ac-lyvutqh-shard-00-00.tdp4abz.mongodb.net:27017,ac-lyvutqh-shard-00-01.tdp4abz.mongodb.net:27017,ac-lyvutqh-shard-00-02.tdp4abz.mongodb.net:27017/?ssl=true&replicaSet=atlas-uweed8-shard-0&authSource=admin&appName=Cluster0';

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully with new URI!');
    console.log('Update backend/.env MONGO_URI with this string.');
    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
  }
}

testConnection();
