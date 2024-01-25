import { Notification } from "src/application/entities/notification";

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      userId: notification.userId,
      title: notification.title,
      content: notification.content.value,
      category: notification.category,
    }
  }
}