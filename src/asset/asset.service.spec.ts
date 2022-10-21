import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AssetService } from './asset.service';

describe('AssetService', () => {
  let service: AssetService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetService, PrismaService],
    }).compile();

    service = module.get<AssetService>(AssetService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined (POST)', () => {
    expect(service).toBeDefined();
  });

  /** For create asset */
  describe("It should create asset", () => {
    it("Should create an asset", async () => {
      expect(await service.create('randomOrgId', "filename"))
    })
  });

  /** For Get asset */
  describe("It should return one asset", () => {
    it("It should get asset with assetId", async () => {
      let dbAsset = await service.create("randomOrgId", "fileName")
      console.log(dbAsset, "from read function")
      expect(await service.getAsset(dbAsset.assetId))
    });
  });

  /** For update asset */
  describe("It should update asset", () => {
    it("should update asset", async () => {
      let dbAsset = await service.create("randomOgrId", "fileName")
      expect(await service.update(dbAsset.assetId, "fileName"))
    });
  });

  /** For delete asset */
  describe("It should delete asset", () => {
    it("Should delete asset", async () => {
      let dbAsset = await service.create("randomOrgId", "fileName");
      expect(await service.delete(dbAsset.assetId))
    });
  });
});
