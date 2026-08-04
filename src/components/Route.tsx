import { useRouter } from "../hooks/useRouter"
import type { RouteProps } from "./types.ts"
export function Route({path, component: Component} : RouteProps){
   const {currentPath} = useRouter();
   if(currentPath !== path) return null

   return <Component/>
}