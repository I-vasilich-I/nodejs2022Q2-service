import { User } from 'src/interfaces';

export class UsersEntity {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(({ id: userId }) => id === userId);
  }

  deleteOne(id: string) {
    this.users = this.users.filter(({ id: userId }) => id !== userId);
  }
}
