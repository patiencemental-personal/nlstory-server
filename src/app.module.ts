import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './post/entities/post.entity';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // 데이터베이스와 연동될 모델들을 넣음
      entities: [PostModel],
      // nestjs에서 작성하는 typeorm 데이터와 postgrsql의 데이터를 싱크할 것이냐? 개발모드에선 true
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
