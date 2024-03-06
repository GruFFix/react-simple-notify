declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '@bruitt/classnames' {
  interface Styles {
    readonly [key: string]: string
  }
  type SXArg = string | string[] | { [key: string]: unknown } | undefined
  type SX = (...args: SXArg[]) => string
  export let withStyles: (styles: Styles) => SX
}
