import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
} else {
    prisma = new PrismaClient({
        log: ['query'],
    });

    // Handle connection errors
    prisma.$connect().catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }
}

export { prisma };
