import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoks1682214905319 implements MigrationInterface {
    name = 'CreateMoks1682214905319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO PUBLIC.model_devices(name, type, min_range, max_range, barcode, batch, unit) VALUES ('Sensor de Umidade do Ar', 'Umidade', 0, 100, '123456789', 'ABC123', '%')`);
        await queryRunner.query(`INSERT INTO PUBLIC.model_devices(name, type, min_range, max_range, barcode, batch, unit) VALUES ('Sensor de Temperatura', 'Temperatura', -30, 60, '987654321', 'DEF456', '°C')`);
        await queryRunner.query(`INSERT INTO PUBLIC.model_devices(name, type, min_range, max_range, barcode, batch, unit) VALUES ('Sensor de Velocidade do Vento', 'Vento', 0, 100, '456789123', 'GHI789', 'Km/h')`);
        await queryRunner.query(`INSERT INTO PUBLIC.model_devices(name, type, min_range, max_range, barcode, batch, unit) VALUES ('Sensor de Precipitação', 'Precipitacao', 0, 100, '321654987', 'JKL012', 'mm')`);
        await queryRunner.query(`INSERT INTO PUBLIC.model_devices(name, type, min_range, max_range, barcode, batch, unit) VALUES ('Sensor de Intensidade Luminosa', 'Luz', 0, 100, '741852963', 'MNO345', 'Lux')`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE PUBLIC.model_devices;`);
    }

}
