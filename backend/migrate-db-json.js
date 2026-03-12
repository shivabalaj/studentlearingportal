const fs = require('fs');
const mongoose = require('mongoose');
const Course = require('./models/Course');

const MONGODB_URI = 'mongodb://chandrashekar:balaji123b@ac-lyvutqh-shard-00-00.tdp4abz.mongodb.net:27017,ac-lyvutqh-shard-00-01.tdp4abz.mongodb.net:27017,ac-lyvutqh-shard-00-02.tdp4abz.mongodb.net:27017/?ssl=true&replicaSet=atlas-uweed8-shard-0&authSource=admin&appName=Cluster0';

async function migrateDbJson() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
    
    // Read db.json
    const dbPath = '../frontend/db.json';
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');
    
    // Import courses (don't set _id - let MongoDB generate)
    const coursesToImport = jsonData.courses.map(course => ({
      ...course,
      id: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    await Course.insertMany(coursesToImport);
    console.log(`✅ Migrated ${coursesToImport.length} courses + ${coursesToImport.reduce((sum, c) => sum + (c.videos?.length || 0), 0)} videos to MongoDB!`);
    
    // Verify
    const count = await Course.countDocuments();
    console.log(`Total courses in MongoDB: ${count}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Migration error:', error);
  }
}

migrateDbJson();
