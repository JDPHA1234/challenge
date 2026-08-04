import type { ReactNode } from 'react'

interface FooterProps {
    children?: ReactNode
}

export function Footer({ children }: FooterProps){
    const numeros : number[] = [2,6,4]
    const tupla : [string,string,string] = ["hola","mundo","!"]
    const numeros2 : Array<number> = [1,2,3] // generico
    // typealias 
    type company = {
        readonly name : string, // sololectura
        readonly age : number, // sololectura
        address : string,
        country? : string // opcional
    }
    type User = {
        readonly id : string, // sololectura
        readonly age : number, // sololectura
        name : string,
        email? : string, // opcional
        role : "admin" | "user" | "super-admin", // union
        company : company
    }
    type Admin = User & {
        role : "admin" | "super-admin"
    }
    type dictionary = {
        [key : string] : string
    }
    //tuplas typescript

    type RGB = [number,number,number]
    const color : RGB = [255,0,0]

    type Stringymuchosnumeros = [string,...number[]] 
    const valores : Stringymuchosnumeros = ["hola",1,2,3,4,5,6,7,8,9]
    return (
        <footer>
            {children}
        
        </footer>
    )
}
