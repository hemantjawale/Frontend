import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImg, status, UserID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          UserID,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status, UserID }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        {
          title,
          featuredImg,
          content,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      )
    } catch (error) {
      console.log(error);
      
    }
  }

async getPosts(queries=[Query.equal('status','active')]){
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries,
      100,
      0
    )
  } catch (error) {
    console.log(error);
    
  }
}

// file upload

}
