const https = require('https');

https.get('https://www.youtube.com/@VMone', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/);
    if (match) {
      console.log('CHANNEL_ID=' + match[1]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
