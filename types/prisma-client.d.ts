declare module "@prisma/client" {
  export type PrismaClient = {
    user: any;
    college: any;
    course: any;
    review: any;
    savedCollege: any;
    $disconnect(): Promise<void>;
  };

  export const PrismaClient: {
    new (options?: unknown): PrismaClient;
  };
}
