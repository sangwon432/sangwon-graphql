import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { TokenPayloadInterface } from '../interfaces/tookenPayload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
      passReqToCallback: true, // Enable request object in validate method
    });
  }

  async validate(req: Request, payload: TokenPayloadInterface) {
    // Use req if needed, e.g., for logging or extracting custom headers
    console.log('Request received:', req.headers);
    return this.userService.getUserById(payload.userId); // Find the user by ID
  }
}
