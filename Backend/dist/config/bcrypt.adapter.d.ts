export declare class BcryptAdapter {
    static hash(password: string): string;
    static compare(password: string, hashed: string): boolean;
}
