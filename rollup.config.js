import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path from 'path'
import pkg from './package.json'

function isExternal (candidate) {
  return Object.keys(pkg.dependencies).some(dependency => {
    return candidate.startsWith(dependency)
  })
}

export default [
  {
    input: path.resolve(__dirname, 'src', 'index.js'),
    external: isExternal,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"]
      })
    ]
  }
]
