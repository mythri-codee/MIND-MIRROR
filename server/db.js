import mongoose from 'mongoose';

// 1. Connect to MongoDB (It will use a local database named 'mindmirror')
mongoose.connect('mongodb://localhost:27017/mindmirror')
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 2. Define how a Profile looks in the database
const ProfileSchema = new mongoose.Schema({
  candidateName: String,
  skills: [String],
  tools: [String],
  mappedDomain: String,
  summary: String,
  experience: String,
  education: String,
  projects: String,
  location: String,
  confidence: Number
}, { timestamps: true });

// 3. Define how an Assessment Result looks in the database
const AssessmentSchema = new mongoose.Schema({
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  accuracy: Number,
  performanceLevel: String,
  categoryScores: Array,
  strengths: [String],
  weakAreas: [String]
}, { timestamps: true });

export const Profile = mongoose.model('Profile', ProfileSchema);
export const Assessment = mongoose.model('Assessment', AssessmentSchema);