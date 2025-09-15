import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    preds: string;

    @Column()
    savePath: string;
}

