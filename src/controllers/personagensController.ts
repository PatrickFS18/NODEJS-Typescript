import { Request, Response } from "express";

import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class firstController {
  //edit page init

  public async EditPageInit(req: Request, res: Response) {
    const characterId = req.body.id;
    const character = await prisma.character.findUnique({
      where: {
        id: Number(characterId),
      },
    });
    res.render("editCharacters", { character });
  }

  //deletar personagem

  public async deletarPersonagens(req: Request, res: Response) {
    const characters = prisma.character.findMany();

    const id = req.body.id;

    // Exclua o personagem com base no ID
    prisma.character.delete({
      where: {
        id: Number(id),
      },
    });

    res.render("allCharacters", { characters });
  }

  //inserir Personagem
  public async inserirPersonagens(req: Request, res: Response) {
    const characters = prisma.character.findMany();

    const {
      name,
      species,
      status,
      type,
      gender,
      originName,
      originLink,
      locationName,
      locationLink,
      image,
      created,
      url,
    } = req.body;

    const newCharacter = prisma.character.create({
      data: {
        name,
        species,
        status,
        type,
        gender,
        originName,
        originLink,
        locationName,
        locationLink,
        image,
        created,
        url,
      },
    });
    res.render("allCharacters", { characters });
  }

  public async listarPersonagens(req: Request, res: Response) {
    try {
      const characters = await prisma.character.findMany();

      res.render("allCharacters", { characters });
    } catch (error) {
      console.error("Erro ao obter personagens:", error);

      res.status(500).json({ error: "Erro ao obter personagens" });
    } finally {
      await prisma.$disconnect();
    }
  }

public async editarPersonagens(req: Request, res: Response) {
  const characters = prisma.character.findMany();

  const id = req.body.id;
  const {
    name,
    species,
    status,
    type,
    gender,
    originName,
    originLink,
    locationName,
    locationLink,
    image,
    created,
    url,
  } = req.body;


  try {
    const updatedCharacter = prisma.character.update({
      where: { id: parseInt(id) },
      data: {
        name,
        species,
        status,
        type,
        gender,
        originName,
        originLink,
        locationName,
        locationLink,
        image,
        created,
        url,
      },
    });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao atualizar personagem:", error);
    res.status(500).send("Erro ao atualizar personagem");
  }
};
}

export const FirstController = new firstController();


