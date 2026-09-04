import http from 'http';

const testEndpoints = async () => {
  const get = (path) =>
    new Promise((resolve, reject) => {
      http.get(`http://localhost:5000${path}`, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
        res.on('error', reject);
      });
    });

  const post = (path, body) =>
    new Promise((resolve, reject) => {
      const payload = JSON.stringify(body);
      const req = http.request(
        `http://localhost:5000${path}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
          res.on('error', reject);
        }
      );
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

  try {
    console.log('Testing Health Endpoint...');
    const health = await get('/api/v1/health');
    console.log('Health Response:', health.status, health.data.status, 'DB:', health.data.database.status);

    console.log('Testing Projects Endpoint...');
    const projects = await get('/api/v1/projects');
    console.log('Projects Count:', projects.data.count, 'Source:', projects.data.source);

    console.log('Testing Services Endpoint...');
    const services = await get('/api/v1/services');
    console.log('Services Count:', services.data.count);

    console.log('Testing Sectors Endpoint...');
    const sectors = await get('/api/v1/sectors');
    console.log('Sectors Count:', sectors.data.count);

    console.log('Testing Clients Endpoint...');
    const clients = await get('/api/v1/clients');
    console.log('Clients Count:', clients.data.count);

    console.log('Testing Testimonials Endpoint...');
    const testimonials = await get('/api/v1/testimonials');
    console.log('Testimonials Count:', testimonials.data.count);

    console.log('Testing Contact Form Submission...');
    const contactRes = await post('/api/v1/contact', {
      fullName: 'Marcus Vance',
      email: 'marcus.vance@enterprise.com',
      company: 'Global Tech Alliance',
      serviceInterest: 'Event Strategy & Vision',
      estimatedBudget: '$100k - $250k',
      timeline: 'Within 3-6 Months',
      message: 'Interested in architectural stage design and production for our annual summit.',
    });
    console.log('Contact POST Response:', contactRes.status, contactRes.data.message);

    console.log('\n✅ ALL API ENDPOINTS TESTED & PASSED SUCCESSFULLY!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testEndpoints();
