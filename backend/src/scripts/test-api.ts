import fetch from 'node-fetch';

const BASE = process.env['BASE_URL'] || 'http://localhost:4000';

async function run() {
  console.log('Running API smoke tests against', BASE);

  // 1. Create user
  const userResp = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `smoke_${Date.now()}@example.local`, firstName: 'Smoke', lastName: 'Test', password: 'Password123!' })
  });
  const user = await userResp.json();
  console.log('Create user status', userResp.status, user);

  // 2. Create restaurant
  const restResp = await fetch(`${BASE}/api/restaurants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `Smoke Ristorante ${Date.now()}`, address: 'Via Test 1' })
  });
  const rest = await restResp.json();
  console.log('Create restaurant status', restResp.status, rest);

  // 3. Fetch listings
  const listU = await fetch(`${BASE}/api/users`);
  console.log('List users status', listU.status);

  const listR = await fetch(`${BASE}/api/restaurants`);
  console.log('List restaurants status', listR.status);

  console.log('Smoke tests completed');
}

run().catch((e) => { console.error('Smoke tests error', e); process.exit(1); });
