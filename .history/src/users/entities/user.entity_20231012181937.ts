export class User {
    
        @PrimaryGeneratedColumn()
        id: number;
        // @Column()
        // name: string;
        // @Column()
        // lastName: string;
        @Column()
        email: string;
        @Column()
        password: string;
}
