import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User, { description: 'User signup' })
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }
}
