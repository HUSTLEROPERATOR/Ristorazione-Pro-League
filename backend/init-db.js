// Database initialization script
const { exec } = require('child_process');
const path = require('path');

console.log('🗄️  Initializing database...');

const backendPath = 'c:\\Users\\risto\\Desktop\\PROGETTO RPL\\backend';

// Generate Prisma client
exec('npm run db:generate', { cwd: backendPath }, (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Error generating Prisma client:', error);
        return;
    }
    console.log('✅ Prisma client generated');
    
    // Push schema to database
    exec('npm run db:push', { cwd: backendPath }, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Error pushing schema:', error);
            return;
        }
        console.log('✅ Database schema created');
        console.log('🎉 Database initialization complete!');
        
        // Test the auth endpoint
        setTimeout(() => {
            testAuth();
        }, 1000);
    });
});

async function testAuth() {
    try {
        console.log('🧪 Testing authentication endpoint...');
        
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@rpl.dev',
                password: 'TestPassword123!',
                firstName: 'Test',
                lastName: 'User',
                role: 'USER'
            })
        });

        console.log('📊 Status:', response.status);
        const data = await response.json();
        console.log('📄 Response:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('✅ Authentication system working!');
        } else {
            console.log('❌ Authentication test failed');
        }

    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}