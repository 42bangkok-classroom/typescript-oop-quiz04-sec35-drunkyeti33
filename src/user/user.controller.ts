import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test(): [] {
    return this.userService.test();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto): IUser {
    return this.userService.create(dto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<IUser> {
    const fieldList = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, fieldList);
  }
}
