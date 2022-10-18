import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Changes, ChangeStatus } from '@prisma/client';
import {
  init,
  applyChanges,
  save,
  load,
  uuid,
  change,
  decodeChange,
} from '@automerge/automerge';

@Injectable()
export class SolutionService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * @param createSolutionDto
   * @returns Created Solution
   */
  async create(orgId: string) {
    const id: string = uuid();
    const initSolution = init();
    const initBinarySolution: Uint8Array = save(initSolution);
    const encodedSolution = Buffer.from(initBinarySolution).toString('base64');
    const createdSolution = await this.prismaService.solution.create({
      data: {
        solutionId: id,
        orgId: orgId,
        encodedSolution: encodedSolution,
      },
    });
    return createdSolution;
  }

  /**
   * This is for fetch from changes table and applyChanges in solution table
   */
  async getUpdatedSolution(solutionId: string) {
    const solution = await this.prismaService.solution.findUnique({
      where: { solutionId },
    });
    console.log(solution);

    if (solution === null || solution === undefined) {
      throw new BadRequestException('Solution not found');
    }
    const unmergedChanges: Changes[] =
      await this.prismaService.changes.findMany({
        where: {
          solutionId: solutionId,
          status: ChangeStatus.UNMERGED,
        },
      });
    console.log(unmergedChanges);

    if (unmergedChanges === undefined || unmergedChanges.length === 0) {
      return solution.encodedSolution;
    } else {
      const unmergedChangesArray = unmergedChanges.map((changes) =>
        changes.changes.map((c) => new Uint8Array(Buffer.from(c, 'base64'))),
      );
      const decodeSolution = new Uint8Array(
        Buffer.from(solution.encodedSolution, 'base64'),
      );
      const loadUnmergedSolution = load(decodeSolution);
      let updatedSolution = loadUnmergedSolution;
      unmergedChangesArray.forEach(
        (changes) =>
          ([updatedSolution] = applyChanges(updatedSolution, changes)),
      );

      const savedUpdatedSolution = save(updatedSolution);
      const encodedUpdatedSolution =
        Buffer.from(savedUpdatedSolution).toString('base64');
      await this.prismaService.solution.update({
        where: {
          solutionId,
        },
        data: {
          encodedSolution: encodedUpdatedSolution,
        },
      });
      await this.prismaService.changes.updateMany({
        where: {
          solutionId: solutionId,
          changeId: {
            in: unmergedChanges.map((c) => c.changeId),
          },
        },
        data: {
          status: ChangeStatus.MERGED,
        },
      });
      return encodedUpdatedSolution;
    }
  }

  /**
   * @param solutionId
   * @returns Saved Solution In MongoDB
   */
  async getSolutionById(solutionId: string) {
    return await this.getUpdatedSolution(solutionId);
  }

  /**
   * Updating Solution With Incoming Changes
   * @param solutionId
   * @param updateSolutionDto
   * @returns @Void
   */
  async update(solutionId: string, updateSolutionDto: UpdateSolutionDto) {
    if (updateSolutionDto.changes.length === 0) {
      return;
    }
    let actorChanges = {};
    updateSolutionDto.changes.forEach((changeBase64) => {
      let change = decodeChange(
        new Uint8Array(Buffer.from(changeBase64, 'base64')),
      );
      if (actorChanges[change.actor] === undefined) {
        actorChanges[change.actor] = [];
      }
      actorChanges[change.actor].push(changeBase64);
    });

    for (let actor in actorChanges) {
      const createChanges = await this.prismaService.changes.create({
        data: {
          solutionId: solutionId,
          orgId: 'asklhds070as',
          userId: 'asklhn;gf0887',
          actorId: actor,
          changes: updateSolutionDto.changes,
        },
      });
      return;
    }
  }

  /**
   * Deleting Solution
   * @param solutionId
   * @return @void
   */
  async delete(solutionId: string) {
    try {
      await this.prismaService.solution.delete({
        where: {
          solutionId,
        },
      });
    } catch (error) {
      throw new Error('internal server Error');
    }
  }
}
