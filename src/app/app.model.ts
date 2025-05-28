export type Gender='Male' | 'Female';


export type UserEssential= {profilePicURL: string, name: string, email: string, password: string}
export type User= UserEssential & {id:number, bio: string, gender: Gender,coverPhoto?:string,friendId?:Number[],isPrivate?:boolean};

export type Comment={id: number, text: string, user: UserEssential, dateCreated: Date};

export type Like={user: UserEssential, time: Date};

export type Post={id: number, text_content: string, postOwner: UserEssential, datePosted: Date, attachedImagesURLs: string[], likes: Like[], comments: Comment[]};

export type Message={id: number, text: string, sender: User,reciever:User, dateCreated: Date};
export type Friend = {
  user1: User; 
  user2: User;
  isPending: boolean;
  date_created: Date;
};

