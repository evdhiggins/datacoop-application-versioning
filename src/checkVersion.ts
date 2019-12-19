import makeApiRequest from './makeApiRequest'
import { ApiEndpoints, Config } from './types'
import { getConfirmation } from './shared'

const getContinueConfirmation = (version: string) =>
    getConfirmation(
        `Are you sure that you want to continue with the current version (v${version})?`,
    )

const makeCheckVersionRequest = ({ apiUrl, applicationId, version }: Config) =>
    makeApiRequest(apiUrl, ApiEndpoints.CheckVersion, { applicationId, version })

export const checkVersionFactory = (
    getContinueConfirmationFn: typeof getContinueConfirmation,
    makeCheckVersionRequestFn: typeof makeCheckVersionRequest,
) => async (config: Config): Promise<void> => {
    // get version validity information from server
    const checkResults = await makeCheckVersionRequestFn(config)

    if (!checkResults.isValid) {
        const newestRequiredVersion = checkResults.newVersions.find(({ isRequired }) => isRequired)
        console.error(`Error! Current version ${config.version} is no longer permitted to run`)
        console.error(
            `Please update to a supported version (minimum v${
                newestRequiredVersion ? newestRequiredVersion.version : ''
            })`,
        )
        process.exit()
    }

    if (!checkResults.newVersions.length) {
        console.log(`Current version (v${config.version}) is up-to-date!`)
        return
    }

    console.log('Newer versions available:')
    console.log(checkResults.newVersions.map(ver => `  - ${ver.version}: ${ver.notes}`).join('\n'))
    const isContinuing = await getContinueConfirmationFn(config.version)

    if (!isContinuing) {
        console.log('Exiting...')
        process.exit()
    } else {
        console.log('Continuing...')
    }
}

const checkVersion = checkVersionFactory(getContinueConfirmation, makeCheckVersionRequest)

export default checkVersion
