import config from "../conf/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useraccount) {
        return this.login({ email, password });
      } else {
        return useraccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await this.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
