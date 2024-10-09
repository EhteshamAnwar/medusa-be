import { MigrationInterface, QueryRunner , Table} from "typeorm"

export class FAQTagsSchema1723702634743 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "FAQTags",
              columns: [
                { name: "id", type: "varchar", isPrimary: true , },
                { name: "name", type: "varchar", isUnique: true },  // Tag name
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
              ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("FAQTags");
    }

}
