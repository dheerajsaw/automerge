import { HttpStatus } from "@nestjs/common";
import { change, getChanges, init } from "@automerge/automerge";
import * as request from "supertest"
/**
 *  Manual testing file 
 */

describe("DocsController (e2e)", () => {
    let url = `http://localhost:3000/solution`
    let solutionDBId = ""
    describe("/docs/create (POST)", () => {
        it("should create doc", () => {
            return request(url)
                .post("/create/shjd9789sd")
                .set("Accept", " application/json")
                .expect((response: request.Response) => {
                    console.log(response.body, "form create api")
                    solutionDBId = response.body.solutionId
                })
                .expect(HttpStatus.CREATED)
        })
    })

    describe(`/solution/read/9f957051ac824f8088241e3fabc38f1e (GET)`, () => {
        it("should return doc", () => {
            return request(url)
                .get(`/read/309e9bfa45584db8b23147e12c8a6d5b`)
                .set("Accept", "application/json")
                .expect((response: request.Response) => {
                    console.log(response.body, "form read api")
                })
                .expect(HttpStatus.OK)
        })
    })

    let initDoc = init()
    const newDoc = change(initDoc, (doc: { items: { abc: string; done: boolean; }[]; }) => {
        if (!doc.items) doc.items = []
        doc.items.push({ "abc": "deef", done: false })
        doc.items.push({ "abc": "deef", done: false })
        doc.items.push({ "abc": "deef", done: false })
        doc.items.push({ "abc": "deef", done: false })
        doc.items.push({ "abc": "deef", done: false })
    })
    const changes = getChanges(initDoc, newDoc)
    // console.log("changes", changes)
    let updateData = changes.map(c => { return Buffer.from(c).toString('base64') })

    let data = { changes: updateData }
    describe(`docs/update/9f957051ac824f8088241e3fabc38f1e (PATCH)`, () => {
        it("should update doc", () => {
            return request(url)
                .patch(`/update/d12476bebdd34c8ca3862efc8d738330`)
                .set("Accept", "application/json")
                .send(data)
                .expect((response: request.Response) => {
                    console.log(response.body, "from update api")
                })
                .expect(HttpStatus.OK)
        })
    })

    describe(`/docs/delete/be934f55fe85496bb8a2bedc381e3e97 (DELETE)`, () => {
        it("should delete data", () => {
            return request(url)
                .delete("/delete/9c88a9faa1f440a8bc884168619ae41b")
                .set("Accept", "application/json")
                .expect((response: request.Response) => {
                    console.log(response.body, "from delete api")
                })
                .expect(HttpStatus.OK)
        })
    })
})