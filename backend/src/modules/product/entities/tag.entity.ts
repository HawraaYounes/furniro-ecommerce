import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Many-to-many relation with Product
    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[];
}
