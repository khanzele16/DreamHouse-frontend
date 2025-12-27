export interface IRegisterRequest {
    name: string;
    phone_number: string;
    password: string;
    password_confirm: string;
}

export interface ILoginRequest {
    phone_number: string;
    password: string;
}

export interface IRegisterResponse {
    ok: boolean;
    CODE: "OK" | "REGISTER_FAILED" | "ALREADY_REGISTERED" | "INVALID_EMAIL" | "WEAK_PASSWORD" | "INVALID_DATA" | "SERVER_ERROR";
    reason: string;
    access?: string;
    refresh?: string;
}

export interface ILoginResponse {
    ok: boolean;
    CODE: "OK" | "LOGIN_FAILED" | "INVALID_CREDENTIALS" | "USER_NOT_FOUND" | "ACCOUNT_BLOCKED" | "INVALID_EMAIL" | "SERVER_ERROR";
    reason: string;
    token?: string;
    access?: string;
    refresh?: string;
}

export interface IDeleteAccountRequest {
    password: string;
}

export interface IDeleteAccountResponse {
    ok: boolean;
    CODE: "OK" | "DELETE_FAILED" | "INVALID_PASSWORD" | "SERVER_ERROR";
    reason: string;
}

export interface IUpdateProfilePhotoRequest {
    profile_photo: string | File;
}

export interface IUpdateProfilePhotoResponse {
    id: number;
    phone_number: string;
    name: string;
    profile_photo: string;
}