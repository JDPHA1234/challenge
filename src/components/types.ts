// ANY DESACTIVA TYPESCRIPT

import type { HtmlHTMLAttributes, ReactNode } from "react";
// UNKNOWN la alternativa segura de any
 
import type { ComponentType } from 'react'
const variable: unknown = "Hola mundo";

//type narrowing 
if(typeof variable === "string"){
    console.log(variable.toUpperCase())
}
export type Filter = {
    tech: string,
    mod: string,
    idExp: string
}
export type Empresa = {
    nombre? : string,
    image_url ?: string,
    logo_url?: string,
    cant_empleados?:string,
    ubicacion?:string,
    sitio_web_url?: string,
    descripcion?: string
}
export type positions = {
		title: "Senior Frontend Developer",
		meta: "Remoto (Europa)",
		salary: "65k - 85k €",
		tags: ["React", "TypeScript"],
	}
export type content = {
    description : string,
    responsibilities : string,
    requirements : string,
    about : string
}
export type job    = {
    id?: string,
    titulo?: string,
    ubicacion?: string,
    descripcion?: string,
    modalidad?: string,
    technology?: string[] | null,
    nivel?: string | null,
    content?: content ,
    Empresa?: Empresa | Empresa[]
}
export interface FormProps {
    onSearch : (filters: Filter) => void,
    onChangeText : (text: string) => void,
    onReset : () => void,
    initialValue : string,
    initialFilterValue : Filter
}
export interface JobCardProps {
    jobs: job 
}
export interface JobListingProps {
    joblist: job[]
}
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    exact?: boolean;
}
export interface PaginationProps 
{
    currentPage : number,
    totalPages : number,
    onPageChange : (page : number) => void
}
export interface ProtectedRouteProps 
{
    children : ReactNode
} 
export interface RouteProps 
{
   path : string,
   component : ComponentType
}
export interface JobDetailsProps {
    title: string;
    content: string | null 
}
export interface SectionTitleProps {
	title: string
	subtitle?: string
}