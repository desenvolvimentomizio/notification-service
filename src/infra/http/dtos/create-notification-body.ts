import { IsNotEmpty, IsUUID, Length, IsNumber} from "class-validator";

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @Length(4, 35)
  title: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}