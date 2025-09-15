// Direct test script - no browser needed
const testAPI = async () => {
    console.log('🧪 Starting RPL Backend API Tests...\n');
    
    const baseUrl = 'http://localhost:4000';
    
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Endpoint...');
    try {
        const healthResponse = await fetch(`${baseUrl}/health`);
        const healthData = await healthResponse.json();
        console.log(`✅ Health Check: ${healthResponse.status}`);
        console.log(`📄 Response: ${JSON.stringify(healthData, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Health Check Failed: ${error.message}\n`);
    }
    
    // Test 2: Registration
    console.log('2️⃣ Testing Registration Endpoint...');
    try {
        const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'mario.rossi@rpl.test',
                password: 'TestPassword123!',
                firstName: 'Mario',
                lastName: 'Rossi',
                role: 'USER'
            })
        });
        
        const registerData = await registerResponse.json();
        console.log(`✅ Registration: ${registerResponse.status}`);
        console.log(`📄 Response: ${JSON.stringify(registerData, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Registration Failed: ${error.message}\n`);
    }
    
    // Test 3: Login
    console.log('3️⃣ Testing Login Endpoint...');
    try {
        const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'mario.rossi@rpl.test',
                password: 'TestPassword123!'
            })
        });
        
        const loginData = await loginResponse.json();
        console.log(`✅ Login: ${loginResponse.status}`);
        console.log(`📄 Response: ${JSON.stringify(loginData, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Login Failed: ${error.message}\n`);
    }
    
    // Test 4: Invalid endpoint (should return 404)
    console.log('4️⃣ Testing Invalid Endpoint...');
    try {
        const invalidResponse = await fetch(`${baseUrl}/api/nonexistent`);
        const invalidData = await invalidResponse.json();
        console.log(`✅ Invalid Endpoint: ${invalidResponse.status} (Expected 404)`);
        console.log(`📄 Response: ${JSON.stringify(invalidData, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Invalid Endpoint Test Failed: ${error.message}\n`);
    }
    
    console.log('🎉 API Tests Completed!');
};

// Execute tests
testAPI().catch(console.error);