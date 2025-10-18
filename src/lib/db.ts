/*
Why this file?
Because of hot reload. It would create new instances
of Prisma client multiple times and you'd get warnings
like multiple instances of Prisma detected.. it degrades
the development speed. Maybe even some bugs would occur.
global is unaffected by hot reload.
We are storing the new prisma client inside of the global
prisma property.
 */

import { PrismaClient } from "@/generated/prisma";

/*
this creates a type so we dont' get missing type warnings
 */
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
}

/*
In production only this would get created: new PrismaClient();
*/
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;