import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsModule } from './docs/docs.module';
import { MongooseModule } from "@nestjs/mongoose"
import { DocsController } from './docs/docs.controller';

@Module({
  imports: [DocsModule, MongooseModule.forRoot("mongodb+srv://dheerubhai2000:gqG*2JVkTEt5T*G@cluster0.hk6qb.mongodb.net/newNest")],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
