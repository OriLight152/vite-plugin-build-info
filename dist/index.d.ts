import { Plugin } from 'vite';

interface VitePluginBuildInfoOptions {
    name?: string;
    version?: string;
    shortSha?: boolean;
}
declare const vitePluginBuildInfo: (input?: VitePluginBuildInfoOptions) => Plugin;

export { vitePluginBuildInfo };
