import { SendNotification } from "./send-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()

    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      title: 'This is a notification',
      content: 'Notification test',
      category: 1,
      userId: 'example-userId'
    })

    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})