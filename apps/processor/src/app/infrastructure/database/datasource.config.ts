import { DataSourceOptions } from 'typeorm';

export function getConfig() {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'processor',
    password: 'jw8s0F4',
    database: 'invoice',
    synchronize: false,
    migrations: ['./migrations/*.{ts,js}'],
    entities: ['./src/**/entity/*.{ts,js}'],
  } as DataSourceOptions;
}
``