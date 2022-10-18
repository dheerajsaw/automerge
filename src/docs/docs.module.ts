import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { Docs, DocSchema } from './schemas/docs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Docs.name, schema: DocSchema }])],
  controllers: [DocsController],
  providers: [DocsService]
})
export class DocsModule { }