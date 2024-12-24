import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesModule } from './quotes/quotes.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/quotes?retryWrites=true&w=majority", {
      // useNewUrlParser: true,
    }),
    QuotesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('quotes');
  }
}
