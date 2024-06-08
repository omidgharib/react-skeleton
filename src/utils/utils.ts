import tailwindConfig from 'tailwind.config' // IMPORTANT that the path is NOT relative, only the file name
import resolveConfig from 'tailwindcss/resolveConfig'

export default resolveConfig(tailwindConfig)
