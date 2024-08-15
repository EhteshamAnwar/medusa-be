import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class FAQSchema1723557813465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "FAQ",
          columns: [
            { name: "id", type: "varchar", isPrimary: true, },
            { name: "question", type: "TEXT" }, 
            { name: "answer", type: "TEXT" },
            { name: "created_at", type: "timestamp", default: "now()" },
            { name: "updated_at", type: "timestamp", default: "now()" },
          ],
        })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("FAQ");
    }

}
