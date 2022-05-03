module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    // 出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "bundle.js",
  },
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".js", ".ts", ".glsl", "vs", "fs"],
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      // CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // 拡張子 .ts の場合
        test: /\.(ts|js)$/,
        // node_modulesは対象外
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env",
                // TypeScript をコンパイルする
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      // //Javascript
      // {
      //   test: /\.js$/,
      //   // node_modulesは対象外
      //   exclude: /node_modules/,
      //   //トランスコンパイラ
      //   use: ["babel-loader"],
      // },
      // //Typescript
      // {
      //   test: /\.ts$/,
      //   // node_modulesは対象外
      //   exclude: /node_modules/,
      //   //トランスコンパイラ
      //   use: ["ts-loader", "babel-loader"],
      // },
      //Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
      //Shader
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
