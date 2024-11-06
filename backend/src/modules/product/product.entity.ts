import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { ProductImage } from './product-image.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column()
    description: string;

    // Foreign key for Category
    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images: ProductImage[];
}
