import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/users/users.module';
import { ToursModule } from './controllers/tours/tours.module';
import { dbConfig } from './config/dbConfig';
import { OrdersModule } from './controllers/orders/orders.module';
import { TourItemModule } from './controllers/tour-item/tour-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRootAsync(dbConfig),
    ToursModule,
    TourItemModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
