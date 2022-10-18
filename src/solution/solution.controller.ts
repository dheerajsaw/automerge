import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) { }

  @Post("/create/:orgId")
  create(@Param("orgId") orgId: string) {
    return this.solutionService.create(orgId);
  }

  @Get('/read/:solutionId')
  findOne(@Param('solutionId') solutionId: string) {
    return this.solutionService.getSolutionById(solutionId);
  }

  @Patch('/update/:solutionId')
  update(
    @Param('solutionId') solutionId: string,
    @Body() updateSolutionDto: UpdateSolutionDto
  ) {
    return this.solutionService.update(solutionId, updateSolutionDto);
  }

  @Delete('/delete/:solutionId')
  delete(@Param('solutionId') solutionId: string) {
    return this.solutionService.delete(solutionId);
  }
}
