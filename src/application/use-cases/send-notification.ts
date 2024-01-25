import { Injectable } from "@nestjs/common";
import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { Content } from "@application/entities/content";

interface SendNotificationRequest {
  userId: string;
  title: string;
  content: string;
  category: number;
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { userId, content, category, title } = request

    const notification = new Notification({
      userId,
      title,
      content: new Content(content),
      category
    })

    await this.notificationsRepository.create(notification)

    return{
      notification
    }
  }

}