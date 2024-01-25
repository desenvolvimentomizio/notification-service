import { Content } from "@application/entities/content";
import { Notification, NotificationProps} from "@application/entities/notification";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    userId: 'user-1',
    title: 'This is a title',
    content: new Content('This is a content'),
    category: 1,
    ...override
  })
}