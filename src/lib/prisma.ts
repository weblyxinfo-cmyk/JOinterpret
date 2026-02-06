import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  return new PrismaClient();
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient() ?? new Proxy({} as PrismaClient, {
    get(_, prop) {
      if (typeof prop === "string") {
        return new Proxy(() => {}, {
          get() {
            return () => Promise.resolve(null);
          },
          apply() {
            return Promise.resolve(null);
          },
        });
      }
    },
  });

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}
