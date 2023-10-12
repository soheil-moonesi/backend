export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        email: string;
        @Column()
        password: string;
          @Column()
        // name: string;
        // @Column()
        // lastName: string;
}
