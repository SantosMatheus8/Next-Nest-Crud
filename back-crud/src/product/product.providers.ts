import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

export const productProviders = [
  {
    provide: 'ProductRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
