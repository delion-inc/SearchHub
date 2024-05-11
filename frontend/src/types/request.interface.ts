export interface RequestFormData {
   name: string;
   description: string;
   location: string;
   gender: GenderType;
}

type GenderType = "M" | "W" | "O" | "";