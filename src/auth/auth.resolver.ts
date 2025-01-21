import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { TokenResponse } from '../user/dto/TokenResponse';
import { LoggedUserDto } from '../user/dto/loggedin-user.dto';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TokenResponse, { description: 'User login' })
  async loginUser(
    @Args('loggedUserDto') loggedUserDto: LoggedUserDto,
    @Context('req') req: any,
  ): Promise<User> {
    console.log('REQREQREQREQ', req);
    console.log('ARGS+++++++++++++++++++++++', loggedUserDto);
    // const { user } = req;
    // const token = await this.authService.generateAccessToken(user.id);

    return req.user;
  }
}
