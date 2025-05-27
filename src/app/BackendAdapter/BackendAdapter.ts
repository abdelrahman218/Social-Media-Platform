import { Post, User } from "../app.model";

export interface BackendAdapter{
    postsAdapter(httpResponse: any[]): Post[];
    backendNewPostAdapter(post: Post, images: FileList | null | undefined) : FormData;
    userAdapter(httpResponse: any[]): User[];
    backendEditPostAdapter(postId: number, postText: string, images: FileList | null | undefined): FormData;
}