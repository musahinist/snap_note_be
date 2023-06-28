import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    NoteModule,
    UserModule,
    PrismaModule,
    ChatModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
