require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('express').json;

const app = express();

app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());

const { pool, initDb } = require('./db');

// Serialize + deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Setup Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
  });
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/signup-info')
);

app.get('/signup-info', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'signup_info.html'));
});

// API Route to Save User Info
app.post('/api/save-user-info', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { name, email, batch, yearOfStudy, course, enrollmentNumber, collegeEmail, groupNumber, hostelStatus } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (google_id, name, email, batch, year_of_study, course, enrollment_number, college_email, group_number, hostel_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [req.user.id, name, email, batch, yearOfStudy, course, enrollmentNumber, collegeEmail, groupNumber, hostelStatus]
    );

    res.json({ success: true, data: result.rows[0], redirectUrl: '/titlepage' });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`
    <h1>Welcome ${req.user.name}</h1>
    <p>Email: ${req.user.email}</p>
    <a href="/auth/logout">Logout</a>
  `);
});

app.get('/auth/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});
app.get('/titlepage', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'titlepage.html'));
});

initDb().then(() => {
  app.listen(3000, () => console.log('🚀 Server at http://localhost:3000'));
}).catch(err => {
  console.error("Failed to initialize database:", err);
});
// console.log("DB Password Type:", typeof process.env.DB_PASSWORD);
// console.log("DB Password Value:", process.env.DB_PASSWORD);