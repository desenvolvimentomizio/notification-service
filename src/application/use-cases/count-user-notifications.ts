import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";

interface CountNotificationRequest {
  userId: string;
}

interface CountNotificationResponse {
  count: number
}

@Injectable()
export class CountUserNotification{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CountNotificationRequest): Promise<CountNotificationResponse> {
    const { userId } = request

    const count = await this.notificationsRepository.countManyByUserId(userId)

    return{
      count
    }
  }

}