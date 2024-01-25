import { IsNotEmpty, IsUUID } from "class-validator";

export class CancelNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}