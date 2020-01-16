export const dispatch = async (dispatchRoute, dispatchParams) => {
    const actionRoute = dispatchRoute.split('/')[0]
    const actionName = dispatchRoute.split('/')[1]
    const {
        actions
    } = await import(`./${actionRoute}`)
    return actions()[actionName](dispatchParams)
}