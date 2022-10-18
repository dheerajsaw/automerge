import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Solution } from '@prisma/client';
import { useContainer } from 'class-validator';
import { change, getChanges, init } from '@automerge/automerge';

describe('solution (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let solution: Solution;

  const solutionShape = expect.objectContaining({
    solutionId: expect.any(String),
    orgId: expect.any(String),
    encodedSolution: expect.any(String),
    createdAt: expect.any(Date)
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    // await prisma.truncate();
    // await prisma.resetSequences();
    await prisma.$disconnect();
    await app.close();
  });

  afterEach(async () => {
    // TODO: use transactions and transaction rollback once prisma supports it
  });

  describe('POST /solution/randomId', () => {
    it('create a solution for create api', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/solution/randomId')
      expect(status).toBe(201);
    });
  });

  // describe('POST /solution/randomId', () => {
  //   let dataBaseId = ""
  //   it('create a solution for read the solution by get api', async () => {
  //     const { status, body } = await request(app.getHttpServer())
  //       .post('/solution/randomId')
  //     expect(status).toBe(201);
  //     dataBaseId = body.solutionId
  //   });

  //   describe(`GET /solution/read/${dataBaseId}`, () => {
  //     it('return a solution', async () => {
  //       const { status, body } = await request(app.getHttpServer())
  //         .get(`/solution/read/${dataBaseId}`);
  //       expect(status).toBe(200);
  //     });
  //   });
  //   // describe('with non existing owner', () => {
  //   //   it('returns HTTP status 400', async () => {
  //   //     const beforeCount = await prisma.cat.count();

  //   //     const { status, body } = await request(app.getHttpServer())
  //   //       .post('/cats')
  //   //       .send({
  //   //         name: 'TestCat',
  //   //         breed: 'TestBreed',
  //   //         age: 5,
  //   //         ownerId: 'non-existing',
  //   //       });

  //   //     const afterCount = await prisma.cat.count();

  //   //     expect(status).toBe(400);
  //   //     expect(afterCount - beforeCount).toBe(0);
  //   //   });
  //   // });
  // });

  // describe('POST /solution/randomId', () => {
  //   let dataBaseId = ""
  //   it('create a solution for update by update api', async () => {
  //     const { status, body } = await request(app.getHttpServer())
  //       .post('/solution/randomId')
  //     expect(status).toBe(201);
  //     dataBaseId = body.solutionId
  //   });

  //   let initDoc = init()
  //   const newDoc = change(initDoc, (doc: { items: { abc: string; done: boolean; }[]; }) => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ "abc": "deef", done: false })
  //     doc.items.push({ "abc": "deef", done: false })
  //     doc.items.push({ "abc": "deef", done: false })
  //     doc.items.push({ "abc": "deef", done: false })
  //     doc.items.push({ "abc": "deef", done: false })
  //   })
  //   const changes = getChanges(initDoc, newDoc)
  //   // console.log("changes", changes)
  //   let updateData = changes.map(c => { return Buffer.from(c).toString('base64') })

  //   describe('PATCH /update', async () => {
  //     const { status, body } = await request(app.getHttpServer())
  //       .patch(`/solution/update/${dataBaseId}`)
  //       .send({
  //         solutionId: dataBaseId,
  //         changes: updateData
  //       });
  //     expect(status).toBe(200);
  //   });
  // });



  // describe('POST /solution/randomId', () => {
  //   let dataBaseId = ""
  //   it('create a solution for delete by delete api', async () => {
  //     const { status, body } = await request(app.getHttpServer())
  //       .post('/solution/randomId')
  //     expect(status).toBe(201);
  //     dataBaseId = body.solutionId
  //   });

  //   describe('DELETE /solution/solutionId', () => {
  //     it('deletes a solution', async () => {
  //       const { status, body } = await request(app.getHttpServer()).delete(
  //         `/solution/delete/${dataBaseId}`,
  //       );
  //       expect(status).toBe(200)
  //     });
  //   });
  // });
});