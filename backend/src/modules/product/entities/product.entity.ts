import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../category/category.entity';
import { ProductImage } from './product-image.entity';
import { Color } from './color.entity';
import { Tag } from './tag.entity';

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

    @Column({ unique: true, nullable: false }) 
    sku: string;

    // Foreign key for Category
    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images: ProductImage[];

    @ManyToMany(() => Color, (color) => color.products, { cascade: true })
    @JoinTable({
        name: "products_colors",
    })
    colors: Color[];

    @ManyToMany(() => Tag, (tag) => tag.products, { cascade: true })
    @JoinTable({
        name: "products_tags",  // Junction table name
    })
    tags: Tag[];
}
