const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 5000;

require('./routes/authRoutes')(app);

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
