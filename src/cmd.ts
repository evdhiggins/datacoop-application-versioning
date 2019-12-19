import registerApplication from './registerApplication'
import { loadConfigFile, makeConfigFile } from './shared'
import incrementVersion from './incrementVersion'
import checkVersion from './checkVersion'

const renderHelp = () => {
    console.log('Command unknown.')
    console.log('The DataCoop application versioning script supports the following modes: ')
    console.log('  - init: Create a dcversion.config.json file')
    console.log('  - register: Register the application with the remote server')
    console.log('  - increment: Increment the current application patch / minor / major version')
    console.log('  - check: Check the current application version against available versions.')
}

const renderNoConfig = () => {
    console.error('No dcversion.config.json file found.')
}

export default async () => {
    const mode = String(process.argv[2])
        .toLowerCase()
        .trim()

    if (!mode) {
        return renderHelp()
    }

    if (mode === 'init') {
        return makeConfigFile({ applicationId: '', apiUrl: '', version: '' })
    }

    const config = loadConfigFile()
    if (!config) {
        return renderNoConfig()
    }

    if (mode === 'register') {
        return registerApplication(config)
    }

    if (mode === 'increment') {
        return incrementVersion(config)
    }

    if (mode === 'check') {
        return checkVersion(config)
    }

    return renderHelp()
}
