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

  async createPost({ title, slug, content, featuredImage, status, userId }) {
  try {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      {
         title,                     // ✅ lowercase
        content,                   // ✅ correct
        featuredImage, // ✅ correct name
        Status: status,            // ✅ exact case
        UserID: userId,        // must match Appwrite
      }
    );
  } catch (error) {
    console.error("Create Post Error:", error);
  }
}


 async updatePost(slug, { title, content, featuredImage, status }) {
  try {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      {
        title,
        content,
        featuredImage,
        Status: status,
      }
    );
  } catch (error) {
    console.error("Update Post Error:", error);
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
      console.error("Delete Post Error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Get Post Error:", error);
    }
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("Status", "active"),
          Query.limit(100),
        ]
      );
    } catch (error) {
      console.error("Get Posts Error:", error);
    }
  }

  // 📁 File Upload

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Upload File Error:", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Delete File Error:", error);
      return false;
    }
  }

getFilePreview(fileId) {
  if (!fileId) return null;
  return this.bucket
    .getFileView(conf.appwriteBucketId, fileId)
    .toString();
}

}

const service = new Service();
export default service;
