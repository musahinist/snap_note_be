import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './decorator/public.decorator';

import { UserExistGuard } from './guard/user-exist.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Public
  @Public()
  @UseGuards(UserExistGuard)
  @Post('signup')
  signUp(@Body() authUserDto: AuthUserDto) {
    return this.authService.signUp(authUserDto);
  }

  //Local
  @UsePipes(new ValidationPipe({ transform: true }))
  @Public() // to skip the jwt authentication
  //  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() authUserDto: AuthUserDto) {
    return this.authService.signIn(authUserDto);
  }
}
