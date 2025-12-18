import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Create account + login
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return await this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  // LOGIN (SAFE)
  async login({ email, password }) {
    try {
      // Check if already logged in
      await this.account.get();
      return; // user already logged in
    } catch {
      // No session → create one
      // Appwrite SDK v21+ uses createEmailPasswordSession (createEmailSession was removed)
      return await this.account.createEmailPasswordSession(email, password);
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  // LOGOUT
  async logout() {
    try {
      await this.account.deleteSessions(); // logout from all devices
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }
}

const authservice = new AuthService();
export default authservice;
