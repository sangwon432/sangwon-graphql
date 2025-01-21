import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './interfaces/tookenPayload.interface';
import { LoggedUserDto } from '../user/dto/loggedin-user.dto';

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

  async logInUser(loggedUserDto: LoggedUserDto) {
    const user = await this.userService.getUserByEmail(loggedUserDto.email);
    console.log('USER', user);

    if (!user) {
      console.warn(
        `Login failed: User not found for email ${loggedUserDto.email}`,
      );
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatched = await bcrypt.compare(
      loggedUserDto.password,
      user.password,
    );

    console.log('ISASSWORDMATCHED', isPasswordMatched);

    if (!isPasswordMatched) {
      console.warn(
        `Login failed: Incorrect password for email ${loggedUserDto.email}`,
      );
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    user.password = undefined; // 비밀번호를 응답에서 제거
    return user;
  }

  // async logInUser(loggedinUserDto: LoggedinUserDto) {
  //   const user = await this.userService.getUserByEmail(loggedinUserDto.email);
  //   const isPasswordMatched = await bcrypt.compare(
  //     loggedinUserDto.password,
  //     user.password,
  //   );
  //   if (!isPasswordMatched) {
  //     throw new HttpException(
  //       'password does not match',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   // user.password = undefined;
  //   return user;
  // }

  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESSTOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESSTOKEN_EXPIRATION_TIME')}`,
    });
    return token;
  }
}
