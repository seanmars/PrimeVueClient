import autoprefixer from 'autoprefixer';
import type {ProcessOptions, AcceptedPlugin} from 'postcss';

const config: ProcessOptions & { plugins?: AcceptedPlugin[] } = {
    plugins: [
        autoprefixer,
    ],
};

export default config;