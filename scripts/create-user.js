// scripts/create-user.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createUser() {
    const username = 'asd_admin';
    const password = '@dminp@ssw0rd';
    const firstName = 'Super';
    const lastName = 'Admin';
    const email = 'admin@gmail.com';
    const role = 'admin';

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log('User already exists');
        process.exit(1);
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                active: true,
                role
            },
        });
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }

    process.exit(0);
}

createUser();
