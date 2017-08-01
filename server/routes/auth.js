const express = require('express');
const middleware = require('../middleware');
const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');
const Sandbox = require('sandbox');


const router = express.Router();

var sandbox = new Sandbox();

router.route('/')
  .get((req, res) => {
    console.log('/ route accessed!', 'rendering it to user?');
    res.render('index.ejs');
  })
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

router.route('/run')
  .post((req, res) => {
    console.log('Payload recieved running code...');
    console.log('req body:', req.body);
    var { code } = req.body;
    var codeFilePath = path.join(__dirname, 'code.js');
    var command = ['node', codeFilePath].join(' ');
    // console.log('Writing to:', codeFilePath);
    fs.writeFile(codeFilePath, req.body.code, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      var evaluate = new Promise(function (resolve, reject) {
        var options = {
          maxBuffer: 133337
        };
        exec(command, options, function (err, stdout, stderr) {
          // console.log('Running command:', command);
          if (err) {
            console.error(err);
          }
          // console.log('Error:', err, 'Stderr:', stderr.toString());
          // console.log('Stdout:', stdout.toString().split('\n'));
          var logs = stdout.toString().split('\n');
          var verboseError = stderr.toString();
          console.log('verboseError', verboseError);
          // resolve({data: stdout.toString(), error: stderr.toString()});
          sandbox.run(code, output => {
            // console.log('Sandbox output:', output);
            output = {
              result: output.result,
              logs: logs,
              error: err,
              longError: verboseError
            };
            if (err) {
              output.error = err.toString();
            }
            // console.log('Output', output);
            resolve(output);
          });

        });
      })
      .then(output => {
        res.send(output);
      })
      .catch(err => {
        if (err) {
          console.error('WHOOO ERROR!!!', err);
        }
        res.status(404).send('Bleh');
      });

    });
  });

router.route('/login')
  .get((req, res) => {
    res.render('index.ejs');
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
