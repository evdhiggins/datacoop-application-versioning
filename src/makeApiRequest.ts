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
    url: ApiEndpoints.CheckVersion,
    data: CheckVersionReqBody,
): Promise<CheckVersionResponse>
function makeApiRequest(
    url: ApiEndpoints.IncrementVersion,
    data: IncrementVersionReqBody,
): Promise<ApplicationVersion>
function makeApiRequest(
    url: ApiEndpoints.RegisterApplication,
    data: RegisterApplicationReqBody,
): Promise<Application>
function makeApiRequest(
    url: ApiEndpoints,
    data: CheckVersionReqBody | IncrementVersionReqBody | RegisterApplicationReqBody,
): Promise<CheckVersionResponse | ApplicationVersion | Application> {
    return phin({
        url: `http://localhost:3050/${url}`,
        data,
        parse: 'json',
    }) as any
}

export default makeApiRequest
