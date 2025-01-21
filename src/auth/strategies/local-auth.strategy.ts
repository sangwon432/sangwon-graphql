import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    this.name = 'local'; // Optional: Assign a custom name for the strategy
    (this as any)._usernameField = 'email'; // Set `usernameField` to 'email'
  }

  async validate(email: string, password: string) {
    const user = await this.authService.logInUser({ email, password });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
