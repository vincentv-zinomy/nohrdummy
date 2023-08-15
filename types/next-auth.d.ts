import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      onboarding_completed?: boolean;
      waitlist_approved?: boolean;
    } & DefaultSession["user"];
  }
}
