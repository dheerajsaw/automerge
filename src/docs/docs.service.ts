import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Docs, DocsDocument } from './schemas/docs.schema';
import { init, applyChanges, save, load, uuid } from "@automerge/automerge"

@Injectable()
export class DocsService {
  constructor(@InjectModel(Docs.name) private docsModel: Model<DocsDocument>) { }

  create(createDocDto: CreateDocDto) {
    let id: string = uuid()
    const initDoc = init()
    console.log("init", initDoc)
    const initDbDoc: Uint8Array = save(initDoc)
    let encodedDoc = Buffer.from(initDbDoc).toString('base64')
    console.log("saved", initDbDoc)
    const createdDoc = new this.docsModel({ docId: id, doc: encodedDoc });
    createdDoc.save();
    return createdDoc
  }

  async findOne(id: string) {
    let data = await this.docsModel.findOne({ docId: id }).exec();
    return data
  }

  async update(id: string, updateDocDto: UpdateDocDto) {
    const oldDoc = await this.docsModel.findOne({ docId: id }).exec();
    console.log("oldDoc", oldDoc)
    let bytes = new Uint8Array(Buffer.from(oldDoc.doc, 'base64'))
    console.log("loadedDbDoc from db", bytes)
    let loadedDbDoc = load(bytes as Uint8Array) //* known as type Casting
    console.log("loadedDbDoc", loadedDbDoc)
    const changes: string[] = updateDocDto.changes
    let incomingChanges = changes.map(
      c => {
        console.log("changes", c)
        let bytes = new Uint8Array(Buffer.from(c, 'base64'))
        return bytes as Uint8Array  //! know as type casting 
      }
    )
    console.log("incomingChanges", incomingChanges)

    const [updatedDoc] = applyChanges(loadedDbDoc, incomingChanges)
    let updatedBinary = save(updatedDoc)
    let encodedDoc = Buffer.from(updatedBinary).toString('base64')
    console.log("updated doc", encodedDoc)
    await this.docsModel.findOneAndUpdate({ docId: id }, { doc: encodedDoc }).exec();
  }

  async remove(id: string) {
    await this.docsModel.deleteOne({ docId: id }).exec();
  }
}


