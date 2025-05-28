import { Post, User } from "../app.model";

export interface BackendAdapter{
    postsAdapter(httpResponse: any[]): Post[];
    backendNewPostAdapter(post: Post, images: FileList | null | undefined) : FormData;
    userAdapter(httpResponse: any[]): User[];
    editUserAdapter(full_name:string,password:string,images:File | null |undefined ,bio:string): FormData;
    backendEditPostAdapter(postId: number, postText: string, images: FileList | null | undefined,userEmail:string): FormData;
}