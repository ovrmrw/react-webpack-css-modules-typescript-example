/* reference: http://qiita.com/inuscript/items/56d2cc15f76df50dfee7 */
declare module '*.css' {
  export const obj: { [key: string]: string } // css-moduleの結果をstring型のobjectに
  // import style from "./foo.css"で読み込みたいなら下記（後述）
  // export default classes
}
