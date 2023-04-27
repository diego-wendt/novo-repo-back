import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnUnit1682214902319 implements MigrationInterface {
    name = 'AddColumnUnit1682214902319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model_devices" ADD "unit" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model_devices" DROP COLUMN "unit"`);
    }

}
