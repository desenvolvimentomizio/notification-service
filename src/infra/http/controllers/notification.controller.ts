import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { SendNotification } from "src/application/use-cases/send-notification";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CancelNotification } from "@application/use-cases/cancel-notification";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notification";
import { CountUserNotification } from "@application/use-cases/count-user-notifications";
import { GetUserNotifications } from "@application/use-cases/get-user-notifications";

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotication: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countUserNotifications: CountUserNotification,
    private getUserNotifications: GetUserNotifications
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotication.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:userId')
  async countFormUser(@Param('userId') userId: string): Promise<{count : number}> {
    const { count } = await this.countUserNotifications.execute({
      userId
    })

    return {
      count
    }
  }

  @Get('from/:userId')
  async getFromUser(@Param('userId') userId: string) {
    const { notifications } = await this.getUserNotifications.execute({
      userId
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { userId, title, content, category } = body

    const { notification } = await this.sendNotification.execute({
      userId,
      title,
      content,
      category
    })

    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}