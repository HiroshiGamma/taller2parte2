export interface ResponseAPIUser {
    total: number;
    users: User[];
}

export interface User {
    id:              string;
    rut:             string;
    name:            string;
    birthdate:       string;
    parsedBirthdate: Date;
    email:           string;
    gender:          string;
    password:        string;
    enabled:         boolean;
}
