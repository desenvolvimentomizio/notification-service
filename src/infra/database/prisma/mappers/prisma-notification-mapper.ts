import { Notification as RawNotification } from '@prisma/client'
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      title: notification.title,
      userId: notification.userId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      userId: raw.userId,
      title: raw.title,
      content: new Content(raw.content),
      category: raw.category,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
      canceledAt: raw.canceledAt
    }, raw.id)
  }
}