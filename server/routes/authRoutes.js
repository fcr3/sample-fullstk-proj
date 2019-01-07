const passport = require('passport');

module.exports = (app) => {
  // handles initial verification
  // user will see email sign up screen
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // handles callback address and asks passport to handle approval
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send({
      message: 'logged out',
      user: req.user
    });
  });

  app.get('/api/current_user', (req, res) => {
    res.send({
      message: 'current user',
      user: req.user || null
    });
  });
}
