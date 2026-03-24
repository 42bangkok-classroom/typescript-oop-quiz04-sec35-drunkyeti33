import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, '../../data/users.json');

@Injectable()
export class UserService {
  test() {
    return [];
  }

  findAll(): IUser[] {
    const readUserData = readFileSync(filePath, 'utf-8');
    const userData = JSON.parse(readUserData) as IUser[];
    return userData;
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields === undefined) {
      return user;
    }

    return fields.reduce((result, field) => {
      if (field in user) {
        result[field] = user[field as keyof IUser];
      }
      return result;
    }, {} as Partial<IUser>);
  }
  create(dto: CreateUserDto): IUser {
    const users = this.findAll();
    const maxId = users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
    const newUser: IUser = {
      id: String(maxId + 1),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email ?? '',
      username: dto.username ?? '',
    };
    users.push(newUser);
    writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    return newUser;
  }
}
