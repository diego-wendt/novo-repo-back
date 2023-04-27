import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDataColumns1681880906905 implements MigrationInterface {
    name = 'CreateDataColumns1681880906905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "places" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "places" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "places" ADD "delete_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "latitude" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "longitude" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd"`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "longitude" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "latitude" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "update_date"`);
        await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "delete_date"`);
        await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "update_date"`);
        await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "update_date"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
