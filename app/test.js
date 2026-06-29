const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    if (parsed.status === 'healthy') {
      console.log('TEST PASSED: Health check returned healthy');
      process.exit(0);
    } else {
      console.log('TEST FAILED: Unexpected response');
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.log('TEST FAILED:', err.message);
  process.exit(1);
});

req.end();
