export interface LoginFormData {
   email: string;
   password: string;
}

export interface IAuthResponse {
   roles: number[];
   accessToken: string;
} 

export type RegisterFormData = {
   name: string;
   surname: string;
   email: string;
   phone: string;
   password: string;
   confirmPassword: string; 
}; 