import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SolutionService } from './solution.service';
import {
  change,
  equals,
  free,
  getChanges,
  init,
  load,
} from '@automerge/automerge';

describe('SolutionService', () => {
  let service: SolutionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionService, PrismaService],
    }).compile();

    service = module.get<SolutionService>(SolutionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert a solution', async () => {
      expect(await service.create('randomOrgId'));
    });
  });

  describe('get', () => {
    it('should get a single solution', async () => {
      let solution = await service.create('randomOrgId');
      expect(await service.getSolutionById(solution.solutionId));
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      let solution = await service.create('randomOrgId');
      let binSolution = new Uint8Array(
        Buffer.from(solution.encodedSolution, 'base64'),
      );
      let loadedSolution = load(binSolution);
      let updatedSolution = change(loadedSolution, (solution: any) => {
        if (!solution.items) solution.items = [];
        solution.items.push({ abc: 'deef', done: false });
        solution.items.push({ abc: 'hello', done: false });
      });
      let changes = getChanges(loadedSolution, updatedSolution);
      await service.update(solution.solutionId, {
        solutionId: solution.solutionId,
        changes: changes.map((c) => Buffer.from(c).toString('base64')),
      });
      console.log(solution);

      let latestSolution = await service.getSolutionById(solution.solutionId);
      let loadedLatestSolution = load(
        new Uint8Array(Buffer.from(latestSolution, 'base64')),
      );
      expect(equals(loadedLatestSolution, updatedSolution)).toBe(true);

      // add new changes
      let updatedSolution1 = change(updatedSolution, (solution: any) => {
        if (!solution.items) solution.items = [];
        solution.items.push({ abc: 'deef', done: false });
        solution.items.push({ abc: 'hello', done: false });
      });
      let changes1 = getChanges(updatedSolution, updatedSolution1);
      await service.update(solution.solutionId, {
        solutionId: solution.solutionId,
        changes: changes1.map((c) => Buffer.from(c).toString('base64')),
      });
      let latestSolution1 = await service.getSolutionById(solution.solutionId);
      let loadedLatestSolution1 = load(
        new Uint8Array(Buffer.from(latestSolution1, 'base64')),
      );
      expect(equals(loadedLatestSolution1, updatedSolution1)).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete', async () => {
      let solution = await service.create('randomOrgId');
      expect(service.delete(solution.solutionId));
    });
  });
});
