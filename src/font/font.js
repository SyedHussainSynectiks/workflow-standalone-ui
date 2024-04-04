import { Roboto, Manrope, Noto_Sans } from 'next/font/google'


export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400', '500',]
})


export const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '500',]
})


export const notosans = Noto_Sans({
    subsets: ['latin'],
    weight: ['100', '400', '600',]
})
