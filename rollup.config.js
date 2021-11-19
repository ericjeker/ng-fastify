import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/main.ts',
    output: {
      format: 'cjs',
      dir: 'lib',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ]
  },
  {
    input: "types/main.d.ts",
    output: [
      { file: "main.d.ts", format: "es" }
    ],
    plugins: [
      dts()
    ],
  },
];
