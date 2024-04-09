declare module '*.module.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg'
declare module '*.jpg'

declare module 'react-range-slider-input'
declare module 'js-cookie'