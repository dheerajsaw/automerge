import { HttpStatus } from "@nestjs/common";
import { BinaryChange, change, getChanges, init } from "automerge";
import * as request from "supertest"


describe("DocsController (e2e)", () => {
    let url = `http://localhost:3000/docs`

    describe("/docs/create (POST)", () => {
        it("should create doc", () => {
            return request(url)
                .post("/create")
                .set("Accept", " application/json")
                .expect((response: request.Response) => {
                    console.log(response.body)
                })
                .expect(HttpStatus.CREATED)
        })
    })

    describe(`/docs/read/9f957051ac824f8088241e3fabc38f1e (GET)`, () => {
        it("should return doc", () => {
            return request(url)
                .get("/read/9f957051ac824f8088241e3fabc38f1e")
                .set("Accept", "application/json")
                .expect((response: request.Response) => {
                    console.log(response.body)
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
    const changes: BinaryChange[] = getChanges(initDoc, newDoc)
    console.log("changes", changes)
    let updateData = changes.map(c => {return  Buffer.from(c).toString('base64') })

    let data = { changes: updateData }
    console.log(data)
    describe(`docs/update/9f957051ac824f8088241e3fabc38f1e (PATCH)`, () => {
        it("should update doc", () => {
            return request(url)
                .patch("/update/9f957051ac824f8088241e3fabc38f1e")
                .set("Accept", "application/json")
                .send(data)
                .expect((response: request.Response) => {
                    console.log(response.body)
                })
                .expect(HttpStatus.OK)
        })
    })

    describe(`/docs/delete/be934f55fe85496bb8a2bedc381e3e97 (DELETE)`, () => {
        it("should delete data", () => {
            return request(url)
                .delete("/delete/be934f55fe85496bb8a2bedc381e3e97")
                .set("Accept", "application/json")
                .expect((response: request.Response) => {
                    console.log(response.body)
                })
                .expect(HttpStatus.OK)
        })
    })
})