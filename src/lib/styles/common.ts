export const before = (rest?: string) => `
    &::before{
        display: block;
        clear: both;
        content: '';
        ${rest}
    }
`
export const after = (rest?: string) => `
    &::after{
        display: block;
        clear: both;
        content: '';
        ${rest}
    }
`
export const notoBigger = (line: number = 18, weight: number = 500) => `
    ${weight} 18px/${line}px Noto Sans CJK KR, sans-serif;
`
export const notoBig = (line: number = 16, weight: number = 400) => `
    ${weight} 16px/${line}px Noto Sans CJK KR, sans-serif;
`
export const noto = (line: number = 14, weight: number = 400) => `
    ${weight} 14px/${line}px Noto Sans CJK KR, sans-serif;
`
export const notoSmall = (line: number = 12, weight: number = 400) => `
    ${weight} 12px/${line}px Noto Sans CJK KR, sans-serif;
`
