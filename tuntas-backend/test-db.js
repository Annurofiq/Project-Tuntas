require('dotenv').config();

const pool = require('./src/config/database');

async function testDatabase() {
    try {
        const [rows] = await pool.query(
            'SELECT DATABASE() AS database_name'
        );

        console.log('✅ DATABASE TERHUBUNG!');
        console.log('Database:', rows[0].database_name);

        process.exit(0);
    } catch (error) {
        console.error('❌ DATABASE TIDAK TERHUBUNG!');
        console.error('Error:', error.message);

        process.exit(1);
    }
}

testDatabase();