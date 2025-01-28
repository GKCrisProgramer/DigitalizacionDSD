const excludedRoutes = {
    excluded: [
        'procedimientosProfile', 
        'ProcedimientosDepartment', 
        'cursos-Induccion', 
        'department-description', 
        'profile-description'
    ]
}

export function isRouteExcluded(currentRoute: string): boolean {
    return excludedRoutes.excluded.some(route => currentRoute.includes(route));
}
