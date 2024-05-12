import { GenderType } from "@/types/request.interface";

export default function convertPriority(priority: GenderType): string {
   switch (priority) {
      case "W":
         return "Жіноча";
      case "M":
         return "Чоловіча";
      case "O":
         return "Інша";
      default:
         return "Інша";
   }
}