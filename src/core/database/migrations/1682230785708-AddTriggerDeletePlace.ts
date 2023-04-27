import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTriggerDeletePlace1682230785708 implements MigrationInterface {
  name = "AddTriggerDeletePlace1682230785708";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE OR REPLACE FUNCTION set_devices_delete_date_trigger()
                              RETURNS TRIGGER AS $$
                              BEGIN
                              UPDATE devices SET delete_date = now() WHERE place_id = OLD.id;
                              RETURN NULL;
                              END;
                              $$ LANGUAGE plpgsql;`);

    await queryRunner.query(` CREATE TRIGGER delete_places_trigger
                              AFTER UPDATE ON places
                              FOR EACH ROW
                              WHEN (OLD.delete_date IS NULL AND NEW.delete_date IS NOT NULL)
                              EXECUTE FUNCTION set_devices_delete_date_trigger();`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION IF EXISTS set_devices_delete_date_trigger();`,);
    await queryRunner.query(`DROP TRIGGER IF EXISTS delete_places_trigger ON devices;`,);
  }
}
