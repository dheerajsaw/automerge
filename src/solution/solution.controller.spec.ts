// import { Test, TestingModule } from '@nestjs/testing';
// import { SolutionController } from './solution.controller';
// import { CreateSolutionDto } from './dto/create-solution.dto';
// import { SolutionService } from './solution.service';
// import { UpdateSolutionDto } from './dto/update-solution.dto';
// import { change, getChanges, init } from '@automerge/automerge';



// describe('Solution Controller', () => {
//     let controller: SolutionController;
//     let service: SolutionService;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [SolutionController],
//             providers: [
//                 {
//                     provide: SolutionService,
//                     useValue: {
//                         getOne: jest.fn().mockImplementation((id: string) =>
//                             Promise.resolve(),
//                         ),
//                         insertOne: jest
//                             .fn()
//                             .mockImplementation((solution: CreateSolutionDto) =>
//                                 Promise.resolve({ ...solution }),
//                             ),
//                         updateOne: jest
//                             .fn()
//                             .mockImplementation((id: string, solution: UpdateSolutionDto) =>
//                                 Promise.resolve({ id, ...solution }),
//                             ),
//                         deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
//                     },
//                 },
//             ],
//         }).compile();

//         controller = module.get<SolutionController>(SolutionController);
//         service = module.get<SolutionService>(SolutionService);
//     });

//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//     });

//     let dataBaseId = ""
//     // create before get solution
//     describe('create solution', () => {
//         it('should create a solution', async () => {
//             await expect(controller.create({}, "randomOrgId")).resolves.toEqual({
//                 // decide return type
//             });
//         });
//     });

//     // get solution by id
//     describe('get solution ById', () => {
//         it('should get a single solution', async () => {
//             await expect(controller.findOne(dataBaseId)).resolves.toEqual({});
//         });
//     });

//     // for creation of new solution
//     describe('new Solution', () => {
//         it('should create a new solution', async () => {
//             await expect(controller.create({}, "randomOrgId")).resolves.toEqual({});
//         });
//     });

//     // updating solution
//     describe('update solution', () => {
//         it('should update a solution', async () => {
//             let initDoc = init()
//             const newDoc = change(initDoc, (doc: { items: { abc: string; done: boolean; }[]; }) => {
//                 if (!doc.items) doc.items = []
//                 doc.items.push({ "abc": "deef", done: false })
//                 doc.items.push({ "abc": "deef", done: false })
//                 doc.items.push({ "abc": "deef", done: false })
//                 doc.items.push({ "abc": "deef", done: false })
//                 doc.items.push({ "abc": "deef", done: false })
//             })
//             const changes = getChanges(initDoc, newDoc);
//             let updateData = changes.map(c => { return Buffer.from(c).toString('base64') })
//             const newUpdateDto: UpdateSolutionDto = {
//                 solutionId: dataBaseId,
//                 changes: updateData
//             }
//             await expect(controller.update(dataBaseId, newUpdateDto)).resolves.toEqual({
//                 // have to decide
//             });
//         });
//     });
//     describe('delete Solution', () => {
//         it('should return that it deleted a solution', async () => {
//             await expect(controller.delete(dataBaseId)).resolves.toEqual({});
//         });

//     });
// });



// let db = {};
// const get = jest.fn((k) => db[k]);
// const set = jest.fn((k, v) => (db[k] = v));
// const clear = jest.fn(() => {
//   for (var member in db) delete db[member];
// });
// set("a", 1);
// set("b", 1);
// set("c", 1);
// set("d", 1);
// set("e", 1);
// console.log(get("a"));
// console.log(db);
// clear();
// console.log("cleared", db);

let db = {}

let set = jest.fn((k, v) => db[k] = v)
let get = jest.fn((k) => db[k])

set("a", 7)
set("b", 0)
set("c", 9)
set("e", 6)
set("d", 4)

console.log(db)
console.log(get("a"))
console.log(get("b"))
console.log(get("c"))