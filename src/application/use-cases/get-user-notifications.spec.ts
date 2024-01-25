import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { GetUserNotifications } from "./get-user-notifications"
import { CountUserNotification } from "./count-user-notifications"

describe('Get user notifications', () => {
  it('should be able get user notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getUserNotifications = new GetUserNotifications(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ userId: 'user-1' })
    )

    await notificationsRepository.create(
      makeNotification({ userId: 'user-1' })
    )

    await notificationsRepository.create(
      makeNotification({ userId: 'user-2' })
    )

    const { notifications } = await getUserNotifications.execute({ userId: 'user-1' })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ userId: 'user-1' }),
      expect.objectContaining({ userId: 'user-1' }),
    ]))
  })
})