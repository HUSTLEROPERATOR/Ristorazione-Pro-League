// Simple test script for RPL Backend API
const testEndpoints = async () => {
    const baseUrl = 'http://localhost:4000';
    
    console.log('🧪 Testing RPL Backend API...\n');

    const testCases = [
        { method: 'GET', endpoint: '/health', expectedStatus: 200, description: 'Health Check' },
        { method: 'POST', endpoint: '/api/auth/register', expectedStatus: 501, description: 'User Registration' },
        { method: 'POST', endpoint: '/api/auth/login', expectedStatus: 501, description: 'User Login' },
        { method: 'GET', endpoint: '/api/users/profile', expectedStatus: 501, description: 'Get User Profile' },
        { method: 'GET', endpoint: '/api/restaurants', expectedStatus: 501, description: 'List Restaurants' },
        { method: 'GET', endpoint: '/api/workers/profile', expectedStatus: 501, description: 'Get Worker Profile' },
        { method: 'GET', endpoint: '/api/nonexistent', expectedStatus: 404, description: 'Non-existent Endpoint' }
    ];

    for (const test of testCases) {
        try {
            const response = await fetch(`${baseUrl}${test.endpoint}`, {
                method: test.method,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'RPL-Test-Script/1.0'
                }
            });

            const status = response.status;
            const data = await response.json();
            
            const statusIcon = status === test.expectedStatus ? '✅' : '❌';
            console.log(`${statusIcon} ${test.description}`);
            console.log(`   → ${test.method} ${test.endpoint}`);
            console.log(`   → Status: ${status} (Expected: ${test.expectedStatus})`);
            console.log(`   → Response:`, JSON.stringify(data, null, 2));
            console.log('');

        } catch (error) {
            console.log(`❌ ${test.description}`);
            console.log(`   → Error: ${error.message}\n`);
        }
    }

    console.log('🎉 Tests completed!');
};

// Check if server is running first
fetch('http://localhost:4000/health')
    .then(() => {
        console.log('🚀 Server detected on port 4000, running tests...\n');
        return testEndpoints();
    })
    .catch(() => {
        console.log('❌ Server not running on port 4000');
        console.log('Please start the server with: npm run dev');
    });