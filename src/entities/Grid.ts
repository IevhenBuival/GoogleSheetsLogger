import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('session')
export class Grid extends BaseEntity {
  @Column()
  rowId: number;
  @Column()
  colId: number;

  @Column()
  data: string;
}
