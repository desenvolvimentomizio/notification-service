import { randomUUID } from "crypto";
import { Replace } from "src/helpers/Replace";
import { Content } from "./content";

export interface NotificationProps {
  userId: string;
  title: string;
  content: Content;
  category: number;
  createdAt: Date;
  canceledAt?: Date | null;
  readAt?: Date | null;
}

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(props: Replace<NotificationProps, {createdAt?: Date}>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get id() {
    return this._id
  }

  public set userId(userId: string) {
    this.props.userId = userId
  }

  public get userId(): string {
    return this.props.userId
  }

  public set title(title: string) {
  this.props.title = title
  }

  public get title(): string {
    return this.props.title
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }

  public set category(category: number) {
    this.props.category = category
  }

  public get category(): number {
    return this.props.category
  }

  public read(){
    this.props.readAt = new Date()
  }

  public unread(){
    this.props.readAt = null
  }

  public get readAt() : Date | null | undefined {
    return this.props.readAt
  }

  public cancel(){
    this.props.canceledAt = new Date()
  }

  public get canceledAt() : Date {
    return this.props.canceledAt
  }

  public get createdAt() : Date {
    return this.props.createdAt
  }
}