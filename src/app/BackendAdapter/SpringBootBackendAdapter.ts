import { Injectable } from "@angular/core";
import { BackendAdapter } from "./BackendAdapter";
import { Like, Post, UserEssential, Comment, User } from "../app.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class SpringBootBackendAdapter implements BackendAdapter {
    private static userEssentialAdapter(httpUserEssential: any): UserEssential {
        return {
            profilePicURL: httpUserEssential.profile_picture_name, //Add Url to fetch user profile picture
            name: httpUserEssential.full_name,
            email: httpUserEssential.email
        }
    }

    private static likesAdapter(httpLikes: any[]): Like[] {
        return httpLikes.flatMap((like: any): Like => {
            return {
                user: SpringBootBackendAdapter.userEssentialAdapter(like.user),
                time: new Date(like.date_created)
            }
        })
    }

    private static commentsAdapter(httpComments: any[]): Comment[] {
        return httpComments.flatMap((comment: any): Comment => {
            return {
                id: comment.commentId,
                user: SpringBootBackendAdapter.userEssentialAdapter(comment.user),
                text: comment.text_content,
                dateCreated: new Date(comment.date_sent)
            }
        })
    }

    private static imagesAdapter(httpImages: any[]): string[] {
        const backendUri = "http://localhost:8080";
        return httpImages.flatMap((image: any): string => `${backendUri}/user/getPostImage?imageId=${image.imageId}`);
    }

    postsAdapter(httpResponse: any[]): Post[] {
        return httpResponse.flatMap((response: any): Post => {
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

    backendNewPostAdapter(post: Post, images: FileList | null | undefined): FormData {
        const fd = new FormData();

        for (let index = 0; index < (images?.length || 0); index++) {
            fd.append("images", images?.item(index) as File);
        }

        fd.set("userEmail", post.postOwner.email);
        fd.set("textContent", post.text_content);


        return fd;
    }

    userAdapter(httpUser: any): User[] {
        return httpUser.map((response: any, index: number): User => {
            return {
                profilePicURL: response.profile_picture_name,
                name: response.full_name,
                email: response.email,
                bio: response.bio,
                id: this.generateUserId(response.email, index),
                gender: response.gender,
            }
        });
    }

    private generateUserId(email: string, fallbackIndex: number): number {
        if (!email) return fallbackIndex + 1000;

        let hash = 0;
        for (let i = 0; i < email.length; i++) {
            const char = email.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; 
        }
        return Math.abs(hash) + 10000;
    }
    backendEditPostAdapter(postId: number, postText: string, images: FileList | null | undefined, userEmail: string): FormData {
        const fd = new FormData();

        for (let index = 0; index < (images?.length || 0); index++) {
            fd.append("images", images?.item(index) as File);
        }

        fd.set("postId", postId.toString());
        fd.set("textContent", postText);
        fd.set("userEmail", userEmail);
        return fd;
    }
}