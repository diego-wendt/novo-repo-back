import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllDatabases1681529245407 implements MigrationInterface {
    name = 'CreateAllDatabases1681529245407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mail" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "phone" character varying NOT NULL, "cnpj" character varying NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "UQ_77a81f39da65499fbadecba306e" UNIQUE ("mail"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model_devices" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "min_range" integer NOT NULL, "max_range" integer NOT NULL, "barcode" character varying NOT NULL, "batch" character varying NOT NULL, CONSTRAINT "PK_174e4b03e1aec5d16b6bfa59e31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "company_id" uuid, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL, "mac_address" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "type_id" integer, "place_id" uuid, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_devices_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "devices_id" uuid, CONSTRAINT "PK_44d8cb8dac713cc9670e642e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c" FOREIGN KEY ("type_id") REFERENCES "model_devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_38a779e92e4fc3d5376f438e926" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices_data" ADD CONSTRAINT "FK_267932192ca5cd64938ddb1a893" FOREIGN KEY ("devices_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices_data" DROP CONSTRAINT "FK_267932192ca5cd64938ddb1a893"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_38a779e92e4fc3d5376f438e926"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c"`);
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_f59d6c5abec3a8a26e79b6597bd"`);
        await queryRunner.query(`DROP TABLE "user_devices_data"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "model_devices"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
