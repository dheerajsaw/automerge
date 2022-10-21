import { uuid } from '@automerge/automerge';
import * as fs from "fs"
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
const AWS = require("./aws/aws-s3");

@Injectable()
export class AssetService {

  constructor(private readonly prismaService: PrismaService) { }

  /**
   * @param orgId 
   * @param file 
   * @returns Created Asset
   */
  async create(orgId: string, fileName: any) {
    try {
      const assetId = uuid();
      const putUploadUrl = await AWS.putAwsFile(assetId, orgId, fileName);
      const createdAsset = await this.prismaService.asset.create({
        data: {
          assetId: assetId,
          orgId: orgId,
          assetFileName: fileName
        }
      });
      return {
        assetId: createdAsset.assetId,
        assetFile: createdAsset.assetFileName,
        putAwsUrl: putUploadUrl
      };
    }
    catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "Internal Server Error",
        error: error
      });
    }
  }

  /**
   * @param assetId 
   * @returns Asset document
   */
  async getAsset(assetId: string) {
    try {
      const dbAsset = await this.prismaService.asset.findUnique({
        where: {
          assetId
        }
      });
      if (dbAsset === undefined || dbAsset === null) {
        throw new BadRequestException("Asset not found")
      }
      let signedUrl = await AWS.getAwsFile(assetId, dbAsset.assetFileName)
      return {
        assetId: dbAsset.assetId,
        assetFile: dbAsset.assetFileName,
        awsFile: signedUrl
      };
    }
    catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "Internal Server Error",
        error: error
      });
    }
  }

  async update(assetId: string, fileName: any) {
    try {
      const updatedPutUrl = await AWS.putAwsFile(assetId, fileName);
      await this.prismaService.asset.update({
        where: {
          assetId
        },
        data: {
          assetFileName: fileName
        }
      })
      return {
        assetId: assetId,
        assetFile: fileName,
        putFileUrl: updatedPutUrl
      }
    }
    catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "Internal Server Error",
        error: error
      });
    }
  }

  /**
   * @param assetId 
   * @returns @void
   */
  async delete(assetId: string) {
    try {
      await this.prismaService.asset.delete({
        where: {
          assetId
        }
      });
      return;
    }
    catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "Internal Server Error",
        error: error
      });
    }
  }
}
