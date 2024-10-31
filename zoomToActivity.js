function zoomToActivity(activity, map){
    console.log(activity)
    const bounds = activity.getBounds()
    map.fitBounds(bounds, {padding: [200,200]});
}

export { zoomToActivity }