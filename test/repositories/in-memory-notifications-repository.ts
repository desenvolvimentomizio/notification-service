import { Notification } from "src/application/entities/notification";
import { NotificationsRepository } from "src/application/repositories/notification-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null>  {
    const notification = this.notifications.find(item => item.id === notificationId)

    if(!notification){
      return null
    }

    return notification
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async countManyByUserId(userId: string): Promise<number> {
    return this.notifications.filter(notification => notification.userId === userId).length
  }

  async findManyByUserId(userId: string): Promise<Notification[]> {
    return this.notifications.filter(notification => notification.userId === userId)
  }
  
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(item => item.id === notification.id)

    if(notificationIndex >= 0){
      this.notifications[notificationIndex] = notification
    }
  }
}