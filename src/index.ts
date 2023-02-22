import childProcess from 'child_process'
import type {Plugin, IndexHtmlTransformResult} from 'vite'

interface VitePluginBuildInfoOptions {
  name?: string
  version?: string
  shortSha?: boolean
}

const getGitSHA = (short: boolean) => {
  const {exec} = childProcess
  const sh = short ? 'git rev-parse --short HEAD' : 'git rev-parse HEAD'

  return new Promise((resolve, reject) => {
    exec(sh, (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        const output = stdout.toString()?.replace('\n', '')
        resolve(output)
      }
    })
  })
}

export const vitePluginBuildInfo: (input?: VitePluginBuildInfoOptions) => Plugin = (input = {}) => {
  const {
    name = process.env['npm_package_name'],
    version = process.env['npm_package_version'],
    shortSha = true,
  } = input

  return {
    name: 'vite-plugin-build-info',

    async transformIndexHtml() {
      const gitSHA = await getGitSHA(shortSha)

      const els: IndexHtmlTransformResult = []
      els.push({
        tag: 'script',
        injectTo: 'body',
        children: `
        __BUILD_COMMIT__ = "${gitSHA}"
        __BUILD_TIME__ = "${new Date().toISOString()}"
        `
      })

      return els
    },
  }
}
