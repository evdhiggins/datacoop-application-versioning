import makeApiRequest from './makeApiRequest'
import { ApiEndpoints, Config } from './types'
import { getTextFromPrompt, makeConfigFile } from './shared'

const getApplicationName = (): Promise<string> => {
    return getTextFromPrompt('Application name?')
}

const getApplicationSlug = (applicationName: string): Promise<string> => {
    return getTextFromPrompt('Application slug?', applicationName)
}

const getOrganizationId = (): Promise<string> => {
    return getTextFromPrompt('Organization ID?')
}

export default async (config: Config): Promise<void> => {
    try {
        const name = await getApplicationName()
        const slug = await getApplicationSlug(name)
        const organizationId = await getOrganizationId()

        const application = await makeApiRequest(config.apiUrl, ApiEndpoints.RegisterApplication, {
            name,
            slug,
            organizationId,
        })

        console.log(
            `The application (${application.slug}) has been registered successfully. A config file has been added to the CWD`,
        )

        makeConfigFile({ ...config, applicationId: application.id, version: '0.0.0' })
    } catch (err) {
        console.log(`An error was encountered. Application registry failed.`)
        console.log(err)
    }
}
