import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';

@Module({
  imports: [PrismaModule],
  controllers: [SolutionController],
  providers: [SolutionService]
})
export class SolutionModule { }