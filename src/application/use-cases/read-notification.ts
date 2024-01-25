import { NotificationsRepository } from "@application/repositories/notification-repository";
import { Injectable } from "@nestjs/common";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;


@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {

  }

  async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(notificationId)
    console.log(notification);
    

    if(!notification){
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification)
  }
}