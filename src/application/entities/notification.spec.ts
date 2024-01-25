import { randomUUID } from "node:crypto"
import { Notification } from "./notification"
import { Content } from "./content"

describe('Create Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      userId: randomUUID(),
      title: 'This is a title',
      content: new Content('This is a content'),
      category: 1
    })

    expect(notification).toBeTruthy()
  })
})