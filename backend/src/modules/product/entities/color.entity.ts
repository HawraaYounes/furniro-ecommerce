import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., "Red", "Blue"

  @Column()
  hexCode: string; // e.g., "#FF0000"

  @ManyToMany(() => Product, (product) => product.colors)
  @JoinTable({
    name: "products_colors",
})
  products: Product[];
}