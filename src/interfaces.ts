export interface UserInfo {
    email: string;
    age: number;
    name: string;
    phone: {
      ext: string;
      number: string;
    }
}