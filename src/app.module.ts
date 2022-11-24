import { Module } from '@nestjs/common';
import { UserController } from '@Controllers/user.controller';
import { UserService } from '@Services/user.service';
import { UserRepository } from '@Repository/user.repository';
import { User, UserSchema } from '@Entities/user.entity';


import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserProfile } from '@Profiles/user.profile';


@Module({
  controllers: [
    UserController,

  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (console.log("----------------------------", configService.get<string>('DB_SERVER_URL')), {
        uri: configService.get<string>('DB_SERVER_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  providers: [
    UserProfile,
    UserService,
    UserRepository,
  ],
})
export class AppModule {}
