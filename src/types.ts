export enum ApiEndpoints {
    RegisterApplication = '/application/register',
    IncrementVersion = '/application-version',
    CheckVersion = '/application-version/check',
}

export interface Application {
    id: string
    name: string
    slug: string
    organizationId: string
    createdAt: string
    ApplicationVersions: ApplicationVersion[]
}

export interface ApplicationVersion {
    id: string
    version: string
    applicationId: string
    createdAt: string
}

export interface CheckVersionResponse {
    isValid: boolean
    version: string
    newVersions: ApplicationVersion[]
}
