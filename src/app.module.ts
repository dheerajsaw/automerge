import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [SolutionModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
