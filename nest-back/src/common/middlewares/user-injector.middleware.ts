import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { AuthUtilsService } from '../../users/auth-utils/auth-utils.service';

@Injectable()
export class UserInjectorMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private authUtils: AuthUtilsService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    if (req.header('Authorization')) {
      const email = this.authUtils.decodeAccessToken(
        req.header('Authorization'),
      );
      const user = await this.usersService.findOne(email);
      if (user.access_token === req.header('Authorization')) {
        req.user = user;
        console.log(`injected user ${user.email}`);
      }
    }
    next();
  }
}
