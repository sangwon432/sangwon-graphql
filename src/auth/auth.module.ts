import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, AccessTokenStrategy, AuthResolver],
})
export class AuthModule {}
