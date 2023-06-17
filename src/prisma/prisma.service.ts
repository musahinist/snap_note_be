import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     // https://ruheni.dev/writing/nestjs-prisma-client-logging/
  //     // log: ['error', 'info', 'query', 'warn'],
  //     // errorFormat: 'pretty',
  //   });
  // }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
