import { DummyUser, User, ApiUsage } from "@prisma/client";

declare global {
  type TUser = User;
  type TDummyUser = DummyUser;
  type TApiUsage = ApiUsage;

  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
}

export {};
