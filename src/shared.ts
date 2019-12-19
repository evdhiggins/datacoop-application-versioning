import prompts from 'prompts'
import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { Config } from './types'

export const getTextFromPrompt = async (
    message: string,
    initialValue?: string,
): Promise<string> => {
    const questions: prompts.PromptObject[] = [
        {
            name: 'prompt',
            type: 'text',
            initial: initialValue,
            message,
            validate: v => String(v).length > 0,
        },
    ]
    const response = await prompts(questions)
    return response.prompt
}

export const getConfirmation = async (message?: string): Promise<boolean> => {
    const questions: prompts.PromptObject[] = [
        {
            name: 'confirm',
            type: 'confirm',
            message: message || 'Please confirm that you would like to continue',
        },
    ]
    const response = await prompts(questions)
    return !!response.confirm
}

const getConfigPath = (): string => {
    return resolve(process.cwd(), 'dcversion.config.json')
}

export const loadConfigFile = (): null | Config => {
    try {
        const file = readFileSync(getConfigPath(), 'UTF8')
        if (file) {
            const parsedFile = JSON.parse(file)
            if (
                parsedFile &&
                typeof parsedFile === 'object' &&
                typeof parsedFile.applicationId === 'string' &&
                typeof parsedFile.version === 'string'
            ) {
                return parsedFile
            }
        }
    } catch (err) {
        // do nothing on error
    }
    return null
}

export const makeConfigFile = (config: Config): void => {
    const existingConfig = loadConfigFile() || {}
    const content = JSON.stringify({ ...existingConfig, ...config }, null, 4)
    writeFileSync(getConfigPath(), content, 'UTF8')
}
