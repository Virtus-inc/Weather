const express = require('express');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');
const usersRoutes = require('./routes/users');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS'
  ],
  credentials: true
}));
app.use(express.json());
app.use(
  expressSession({
    name: 'rgb-session',
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
      secure: IS_PRODUCTION,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)
app.use('/auth', authRoutes);
app.use('/', filesRoutes, usersRoutes);

module.exports = app;