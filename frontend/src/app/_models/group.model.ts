import { User } from '@app/_models/user.model'

export class Group {
  id?: number;
  name?: string;
  members? : User;
}
