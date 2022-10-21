import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) { }


  @Post("/:orgId")
  @UseInterceptors(FileInterceptor('file'))
  create(@Param("orgId") orgId: string, createAssetDto: CreateAssetDto) {
    return this.assetService.create(orgId, createAssetDto.fileName);
  }

  @Get('/:assetId')
  findOne(@Param('assetId') assetId: string) {
    return this.assetService.getAsset(assetId);
  }

  @Patch('/:assetId')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('assetId') assetId: string, @Body() createAssetDto: CreateAssetDto) {
    return this.assetService.update(assetId, createAssetDto.fileName);
  }

  @Delete('/:assetId')
  remove(@Param('assetId') assetId: string) {
    return this.assetService.delete(assetId);
  }
}
