import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //signUp is a function that signs up a user and returns an access token
  async signUp(authUserDto: AuthUserDto) {
    /// TODO: remove this code cause it's not needed anymore since we have a [UserExistGuard] that does the same thing
    // const userExist = await this.findUserByEmail(email);
    // if (userExist) throw new ConflictException('User already exist');

    const { email, password } = authUserDto;
    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });

    return {
      access_token: await this.generateAccessToken(user),
    };
  }

  /// signIn is a function that signs in a user and returns an access token and the user
  async signIn(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const user = await this.validatePassword(email, password);

    return {
      access_token: await this.generateAccessToken(user),
      user: delete user.password && user,
    };
  }

  /// validateUser is a helper function that validates a user's password if the user exists with the given email
  async validatePassword(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    const isValid = user && (await argon.verify(user.password, password));
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  /// validateUserById is a helper function that validates a user's id
  async validateUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  /// accessToken is a helper function that generates an access token for a user
  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const options = {
      expiresIn: this.config.get('JWT_EXPIRATION'),
      secret: this.config.get('JWT_SECRET'),
    };
    const token = await this.jwt.signAsync(payload, options);
    return token;
  }
}
