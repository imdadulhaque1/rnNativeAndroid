module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@views': './src/views',
          '@assets': './src/assets',
          '@interface': './src/interface',
          '@restApi': './src/restApi',
          '@rtk': './src/stateManagements/rtk',
          '@contextApi': './src/stateManagements/contextApi',
          '@src': './src',
        },
      },
    ],
  ],
};
