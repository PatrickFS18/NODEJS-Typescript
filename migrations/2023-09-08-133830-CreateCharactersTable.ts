import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCharactersTable1645646519296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "characters",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar" },
                { name: "status", type: "varchar" },
                { name: "species", type: "varchar" },
                { name: "type", type: "varchar" },
                { name: "gender", type: "varchar" },
                // Adicione outros campos conforme necessário
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("characters");
    }

}
