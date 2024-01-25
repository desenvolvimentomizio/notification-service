import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { PrismaNotificationsRepository } from "src/infra/database/prisma/repositories/prisma-notification-repository";
import { NotificationsRepository } from "src/application/repositories/notification-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [
    NotificationsRepository
  ]
})


export class DatabaseModule {}