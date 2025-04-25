export type Gender='Male' | 'Female';

export type User={name: string, email: string, bio: string, profilePicURL: string, gender: Gender};

export type Comment={};

export type Like={userId: number, time: Date};

export type Post={id: number, text_content: string, postOwner: User, datePosted: Date, attachedImagesURLs: string[], likes: Like[], comments: Comment[]};