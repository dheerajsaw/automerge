import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocsDocument = Docs & Document;

@Schema()
export class Docs {
  @Prop()
  docId: string;

  @Prop()
  doc: string
}

export const DocSchema = SchemaFactory.createForClass(Docs);