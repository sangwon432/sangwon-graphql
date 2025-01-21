import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from '../user/dto/loggedin-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './interfaces/tookenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    // newUser.password = undefined;
    return newUser;
  }

  async logInUser(loggedinUserDto: LoggedinUserDto) {
    const user = await this.userService.getUserByEmail(loggedinUserDto.email);
    const isPasswordMatched = await bcrypt.compare(
      loggedinUserDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new HttpException(
        'password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    return user;
  }

  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESSTOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESSTOKEN_EXPIRATION_TIME')}`,
    });
    return token;
  }
}
