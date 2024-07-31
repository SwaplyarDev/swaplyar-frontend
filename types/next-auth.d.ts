// /next-auth.d.ts

import type { DefaultSession } from "next-auth";
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
	interface Session {
		user: {
            id: string;
            role: UserRole;
		} & DefaultSession["user"];
	}
	interface User {
        id: string;
        role: UserRole;
    }
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: string;
	}
}