import { Injectable } from "@angular/core";
import { BackendAdapter } from "./BackendAdapter";
import { Like, Post, UserEssential, Comment } from "../app.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class SpringBootBackendAdapter implements BackendAdapter{
    private static userEssentialAdapter(httpUserEssential: any): UserEssential{
        return {
            name: httpUserEssential.full_name,
            email: httpUserEssential.email
        }
    }

    private static likesAdapter(httpLikes: any[]) : Like[]{
        return httpLikes.flatMap((like: any): Like=>{
            return {
                user: SpringBootBackendAdapter.userEssentialAdapter(like.user),
                time: new Date(like.date_created)
            }
        })
    }

    private static commentsAdapter(httpComments: any[]) : Comment[]{
        return httpComments.flatMap((comment: any): Comment=>{
            return {
                id: comment.commentId,
                user: SpringBootBackendAdapter.userEssentialAdapter(comment.user),
                text: comment.text_content,
                dateCreated: new Date(comment.date_sent)
            }
        })
    }

    private static imagesAdapter(httpImages: any[]) : string[]{
        const backendUri="http://localhost:8080";
        return httpImages.flatMap((image: any): string => `${backendUri}/user/getPostImage?imageId=${image.imageId}`);
    }

    postsAdapter(httpResponse: any[]): Post[] {
        return httpResponse.flatMap((response: any) : Post=>{
            return {
                id: response.postId,
                text_content: response.text_content,
                postOwner: SpringBootBackendAdapter.userEssentialAdapter(response.user),
                datePosted: new Date(response.date_Posted),
                likes: SpringBootBackendAdapter.likesAdapter(response.likes),
                comments: SpringBootBackendAdapter.commentsAdapter(response.comments),
                attachedImagesURLs: SpringBootBackendAdapter.imagesAdapter(response.images) 
            }
        });
    }

    backendNewPostAdapter(post: Post, images: FileList | null | undefined) : any {
        return {
            userEmail: post.postOwner.email,
            textContent: post.text_content,
            images: images || []
        }
    }
}