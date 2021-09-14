import { loadEnvConfig } from '@next/env'

export const setup = async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd())
}

export default setup
