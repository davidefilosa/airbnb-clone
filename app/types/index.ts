import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "verifiedAt"> & {
  createdAt: string;
  updatedAt: string;
  verifiedAt: string | null;
};
