import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { Notification } from "@application/entities/notification";

interface GetNotificationRequest {
  userId: string;
}

interface GetNotificationResponse {
  notifications: Notification[]
}

@Injectable()
export class GetUserNotifications{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: GetNotificationRequest): Promise<GetNotificationResponse> {
    const { userId } = request

    const notifications = await this.notificationsRepository.findManyByUserId(userId)

    return {
      notifications
    }
  }
}