import { Link as NavLink } from 'react-router-dom'

export function Link({ href, children, exact = false, className = '', ...restProps }) {

    return (
        <NavLink to={href} {...restProps} className={className}>
        {children}
        </NavLink>
    )
}