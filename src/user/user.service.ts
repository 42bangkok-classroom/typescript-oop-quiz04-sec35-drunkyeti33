import { Injectable } from '@nestjs/common';
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
}
