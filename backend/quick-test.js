// Simple test for auth endpoint
const testAuth = async () => {
    try {
        console.log('🧪 Testing auth endpoint...');
        
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@test.com',
                password: 'Test123!',
                firstName: 'Test',
                lastName: 'User'
            })
        });

        console.log('Status:', response.status);
        const data = await response.text();
        console.log('Response:', data);

    } catch (error) {
        console.error('Error:', error.message);
    }
};

testAuth();