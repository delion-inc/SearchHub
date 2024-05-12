export interface RequestFormData {
   name: string;
   description: string;
   location: string;
   gender: GenderType;
   image: string | null;
}

export type GenderType = "M" | "W" | "O" | "";

export interface IRequest {
   id: number;
   name: string;
   createdAt: string;
   description: string;
   location: string;
   image: string;
   gender: GenderType;
   info: string | null;
   user: {
      name: string;
      surname: string;
      phone: string;
      email: string;
   };
   comments: IComment[];
}

export interface IComment {
   id: number;
   text: string;
   createdAt: string;
   user: {
      name: string;
      surname: string;
      email: string;
      phone: string;
   };
}