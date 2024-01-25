import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notification.controller";
import { SendNotification } from "src/application/use-cases/send-notification";
import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountUserNotification } from "@application/use-cases/count-user-notifications";
import { GetUserNotifications } from "@application/use-cases/get-user-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notification";

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationsController
  ],
  providers: [
    SendNotification,
    CancelNotification,
    CountUserNotification,
    GetUserNotifications,
    ReadNotification,
    UnreadNotification
  ]
})


export class HttpModule { }