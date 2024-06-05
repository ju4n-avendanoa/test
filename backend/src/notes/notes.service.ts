import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    const newNote = await this.prisma.note.create({
      data: createNoteDto,
    });

    return newNote;
  }

  async findAll() {
    const notes = await this.prisma.note.findMany();
    return notes;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.prisma.note.update({
      where: {
        id,
      },
      data: updateNoteDto,
    });
    return updatedNote;
  }

  async remove(id: string) {
    await this.prisma.note.delete({
      where: {
        id,
      },
    });
    return `This action removes a ${id} note`;
  }
}
