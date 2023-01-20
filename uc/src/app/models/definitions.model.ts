import { Authentication, User } from "@codetrix-studio/capacitor-google-auth";


export interface GoogleAuthPlugin {
  signIn(): Promise<User>;
  refresh(): Promise<Authentication>;
  signOut(): Promise<any>;

  init(): void;
}
