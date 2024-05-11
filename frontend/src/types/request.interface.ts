export interface RequestFormData {
   name: string;
   description: string;
   city: string;
   gender: GenderType;
}

type GenderType = "M" | "W" | "O" | "";