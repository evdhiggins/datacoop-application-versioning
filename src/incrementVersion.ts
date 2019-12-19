import prompts from 'prompts'
import { getTextFromPrompt, makeConfigFile } from './shared'
import makeApiRequest from './makeApiRequest'
import { ApiEndpoints, Config } from './types'

type VersionType = 'MAJOR' | 'MINOR' | 'PATCH'

const getIncrementType = async (): Promise<VersionType> => {
    const response = await prompts({
        name: 'type',
        type: 'select',
        message: 'Select version increment type:',
        choices: [
            {
                value: 'MAJOR',
                title: 'Major',
            },
            {
                value: 'MINOR',
                title: 'Minor',
            },
            {
                value: 'PATCH',
                title: 'Patch',
            },
        ],
    })
    return response.type
}

const getIsRequired = async (): Promise<boolean> => {
    const response = await prompts({
        name: 'isRequired',
        type: 'toggle',
        message: 'This is a required update',
    })
    return response.isRequired
}

const getNotes = () => getTextFromPrompt('Version notes')

const incrementVersion = async (config: Config) => {
    try {
        const type = await getIncrementType()
        const notes = await getNotes()
        const isRequired = await getIsRequired()

        const newVersion = await makeApiRequest(config.apiUrl, ApiEndpoints.IncrementVersion, {
            applicationId: config.applicationId,
            notes,
            isRequired,
            type,
        })
        makeConfigFile({ ...config, version: newVersion.version })
    } catch (err) {
        console.log('An error occurred -- version increment failed!')
        console.error(err)
    }
}

export default incrementVersion
