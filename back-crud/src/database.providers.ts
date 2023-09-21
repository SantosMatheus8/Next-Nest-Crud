import { DataSource } from 'typeorm';
import { CreateProduct1695127707332 } from './migrations/1695127707332-CreateProduct';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        migrations: [CreateProduct1695127707332],
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [CreateProduct1695127707332],
});
