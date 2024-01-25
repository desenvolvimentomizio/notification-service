import { Notification } from "src/application/entities/notification";
import { NotificationsRepository } from "src/application/repositories/notification-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByUserId(userId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId
      }
    })

    return notifications.map(notification => {
      return PrismaNotificationMapper.toDomain(notification)
    })
  }

  async countManyByUserId(userId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        userId: userId
      }
    })

    return count
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data: raw
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    
    console.log(raw);
  
    await this.prisma.notification.update({
      where: {
        id: raw.id
      }, data: {
        ...raw
      }
    })
  }
}