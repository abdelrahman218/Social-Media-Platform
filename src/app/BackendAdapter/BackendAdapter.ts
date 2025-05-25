import { Post } from "../app.model";

export interface BackendAdapter{
    postsAdapter(httpResponse: any[]): Post[];
    backendNewPostAdapter(post: Post, images: FileList | null | undefined) : any;
}