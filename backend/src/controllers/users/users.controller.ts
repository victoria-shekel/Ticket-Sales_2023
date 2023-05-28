import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IUser } from '../../models/IUser';
import { UsersService } from '../../services/users/users.service';
import { UserDto } from '../../dto/user.dto';
import { JwtAuthGuard } from '../../services/authentication/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id): Promise<IUser> {
    return this.userService.getUserById(id);
  }

  @Post()
  sendUser(@Body() data: UserDto): Promise<IUser> {
    return this.userService.checkRegUser(data.login).then((queryRes) => {
      console.log('data reg', queryRes);
      if (queryRes.length === 0) {
        return this.userService.sendUser(data);
      } else {
        console.log('err - user is exists');
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь уже зарегистрирован',
          },
          HttpStatus.CONFLICT,
        );
      }
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  async authUser(@Body() data: UserDto, @Param('login') login): Promise<any> {
    console.log('userController');
    return await this.userService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUsers(@Param('id') id, @Body() data): Promise<IUser> {
    return this.userService.updateUsers(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUsers(): Promise<IUser> {
    return this.userService.deleteUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id): Promise<IUser> {
    return this.userService.deleteUserById(id);
  }
}
