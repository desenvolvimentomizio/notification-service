import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { Notification } from "@application/entities/notification"
import { randomUUID } from "crypto"
import { Content } from "@application/entities/content"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()

    const cancelNotification = new CancelNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})