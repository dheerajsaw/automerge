import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post("/create")
  create(@Body() createDocDto: CreateDocDto) {
    console.log(createDocDto)
    return this.docsService.create(createDocDto);
  }

  @Get('/read/:id')
  findOne(@Param('id') id: string) {
    return this.docsService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docsService.update(id, updateDocDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.docsService.remove(id);
  }
}
