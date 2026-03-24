import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
 
import { readFileSync } from 'fs';
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
}
 