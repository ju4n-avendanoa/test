import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    const { description, categories } = createNoteDto;

    // Buscar o crear categorías
    const categoryIds = await Promise.all(
      categories.map(async (categoryDescription) => {
        let category = await this.prisma.category.findFirst({
          where: { description: categoryDescription },
        });

        if (!category) {
          category = await this.prisma.category.create({
            data: { description: categoryDescription },
          });
        }

        return category.id;
      }),
    );

    const newNote = await this.prisma.note.create({
      data: {
        description,
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Transformar la estructura de los datos para incluir solo las descripciones de las categorías
    const transformedNote = {
      ...newNote,
      categories: newNote.categories.map((noteCategory) => {
        const { id, description } = noteCategory.category;
        return { id, description };
      }),
    };

    return transformedNote;
  }

  async findAll() {
    const notes = await this.prisma.note.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    const transformedNotes = notes.map((note) => ({
      ...note,
      categories: note.categories.map((noteCategory) => {
        const { id, description } = noteCategory.category;
        return { id, description };
      }),
    }));

    return transformedNotes;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const { description, categories, archived } = updateNoteDto;

    // Actualizar la descripción de la nota
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: { description, archived },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (categories) {
      // Eliminar las relaciones existentes en NoteCategory
      await this.prisma.noteCategory.deleteMany({
        where: { noteId: id },
      });

      // Crear o conectar las categorías
      const categoryIds = await Promise.all(
        categories.map(async (categoryDto) => {
          let category = await this.prisma.category.findFirst({
            where: { description: categoryDto.description },
          });

          if (!category) {
            category = await this.prisma.category.create({
              data: { description: categoryDto.description },
            });
          }

          return category.id;
        }),
      );

      // Actualizar la nota con las nuevas categorías
      const updatedNote = await this.prisma.note.update({
        where: { id },
        data: {
          categories: {
            create: categoryIds.map((categoryId) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
    }
    // Transformar la estructura de los datos para incluir solo las descripciones de las categorías
    const transformedNote = {
      ...updatedNote,
      categories: updatedNote.categories.map((noteCategory) => {
        const { id, description } = noteCategory.category;
        return { id, description };
      }),
    };

    return transformedNote;
  }

  async remove(id: string) {
    await this.prisma.noteCategory.deleteMany({
      where: {
        noteId: id,
      },
    });

    await this.prisma.note.delete({
      where: {
        id,
      },
    });

    const allCategories = await this.prisma.category.findMany({
      include: {
        notes: true,
      },
    });

    const categoriesToDelete = allCategories.filter(
      (category) => category.notes.length === 0,
    );

    await Promise.all(
      categoriesToDelete.map((category) =>
        this.prisma.category.delete({
          where: {
            id: category.id,
          },
        }),
      ),
    );

    return `Note ${id} deleted`;
  }
}
