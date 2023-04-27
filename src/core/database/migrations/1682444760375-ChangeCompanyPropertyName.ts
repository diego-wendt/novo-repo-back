import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCompanyPropertyName1682444760375 implements MigrationInterface {
    name = 'ChangeCompanyPropertyName1682444760375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "status" TO "is_confirmed"`);
     }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query(`ALTER TABLE "companies" RENAME COLUMN "is_confirmed" TO "status"`);
    }

}
