export type ApplicationError = {
    name: string;
    message: string;
};

export type RequestError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};

export enum UserRole {
    SU = "SuperUser",
    CP = "Company",
    US = "User"
}

export enum ShortRole {
    SU = "SUPER",
    CP = "COMPANY",
    US = "USER"
}

export enum AcronymRole {
    SU = "SU",
    CP = "CP",
    US = "US"
}