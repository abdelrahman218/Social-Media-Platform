export type Gender='Male' | 'Female';

export type User={id:number,name: string, email: string, bio: string, profilePicURL: string, gender: Gender,coverPhoto?:string,friendId?:Number[],password?:string, dateCreated?:Date, dateUpdated?:Date};

export type Comment={id: number, text: string, user: User, dateCreated: Date};

export type Like={userId: number, time: Date};

export type Post={id: number, text_content: string, postOwner: User, datePosted: Date, attachedImagesURLs: string[], likes: Like[], comments: Comment[]};

export type Message={id: number, text: string, sender: User,reciever:User, dateCreated: Date};