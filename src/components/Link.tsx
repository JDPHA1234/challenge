import { Link as NavLink, To } from 'react-router-dom'
import type { LinkProps } from './types.ts'
export function Link({ href, children, exact = false, className = '', ...restProps } : LinkProps) {

    return (
        <NavLink to={href as To} {...restProps} className={className}>
        {children}
        </NavLink>
    )
}