var digest = require('http-digest-client').createDigestClient('Default User', 'robotics');

digest.request({
  host: 'http://172.31.9.212',
  path: '/subscribe',
  port: 80,
  method: 'POST',
  headers: { "User-Agent": "Antero Juutinen", "Content-Type": "application/x-www-form-urlencoded" } // Set any headers you want
}, function (res) {
  res.on('data', function (data) {
    console.log(data.toString());
  });
  res.on('error', function (err) {
    console.log('oh noes');
  });
});

