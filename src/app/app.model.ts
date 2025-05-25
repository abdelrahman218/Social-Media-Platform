export type Gender='Male' | 'Female';

export type UserEssential= {name: string, email: string };
export type User= UserEssential & {id:number, bio: string, profilePicURL: string, gender: Gender,coverPhoto?:string,friendId?:Number[]};

export type Comment={id: number, text: string, user: UserEssential, dateCreated: Date};

export type Like={user: UserEssential, time: Date};

export type Post={id: number, text_content: string, postOwner: UserEssential, datePosted: Date, attachedImagesURLs: string[], likes: Like[], comments: Comment[]};