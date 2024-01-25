import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { CountUserNotification } from "./count-user-notifications"

describe('Count notifications by userId', () => {
  it('should be able to count user notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countUserNotifications = new CountUserNotification(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ userId: 'user-1' })
    )

    await notificationsRepository.create(
      makeNotification({ userId: 'user-1' })
    )
    await notificationsRepository.create(
      makeNotification({ userId: 'user-2' })
    )

    const { count } = await countUserNotifications.execute({userId: 'user-1'})

    expect(count).toEqual(2)
  })
})