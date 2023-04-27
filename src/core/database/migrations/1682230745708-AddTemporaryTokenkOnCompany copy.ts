import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemporaryTokenkOnCompany1682230745708 implements MigrationInterface {
    name = 'AddTemporaryTokenkOnCompany1682230745708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "tempToken" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "tempTokenExpireDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "tempTokenExpireDate"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "tempToken"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "status"`);
    }

}
