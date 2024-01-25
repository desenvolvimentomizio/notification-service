import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"
import { ReadNotification } from "./read-notification"

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id
    })

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})