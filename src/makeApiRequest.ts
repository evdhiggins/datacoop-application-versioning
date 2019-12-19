import phin from 'phin'
import { ApiEndpoints, CheckVersionResponse, ApplicationVersion, Application } from './types'

interface CheckVersionReqBody {
    version: string
    applicationId: string
}
interface IncrementVersionReqBody {
    applicationId: string
    type: 'MAJOR' | 'MINOR' | 'PATCH'
    notes: string
    isRequired?: boolean
}
interface RegisterApplicationReqBody {
    organizationId: string
    name: string
    slug: string
}

function makeApiRequest(
    apiUrl: string,
    endpoint: ApiEndpoints.CheckVersion,
    data: CheckVersionReqBody,
): Promise<CheckVersionResponse>
function makeApiRequest(
    apiUrl: string,
    endpoint: ApiEndpoints.IncrementVersion,
    data: IncrementVersionReqBody,
): Promise<ApplicationVersion>
function makeApiRequest(
    apiUrl: string,
    endpoint: ApiEndpoints.RegisterApplication,
    data: RegisterApplicationReqBody,
): Promise<Application>
function makeApiRequest(
    apiUrl: string,
    endpoint: ApiEndpoints,
    data: CheckVersionReqBody | IncrementVersionReqBody | RegisterApplicationReqBody,
): Promise<CheckVersionResponse | ApplicationVersion | Application> {
    return phin({
        url: `${apiUrl}/${endpoint}`,
        data,
        parse: 'json',
    }) as any
}

export default makeApiRequest
