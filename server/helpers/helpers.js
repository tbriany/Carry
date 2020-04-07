const handleErrors = (response, err) => {
    console.log('ERROR: - ', err)
    if (err.code === "23505" && err.detail.includes("already exists")) {
        console.log('Attempt to register a new user with a taken email')
        response.status(403).json({
          error: true,
          message: 'email already registered',
          payload: null,
        }) 
    } else if (err.message === 'No data returned from the query.') {
        console.log('No match for the selection')
        response.status(404).json({
          error: true,
          message: 'No match for the selection',
          payload: null,
        }) 
    } else if (err.code === '23503') {
        response.status(403).json({
          error: true,
          message: 'Reference error!',
          payload: null,
        }) 
    } else {
        response.status(500).json({
          error: true,
          message: 'Sorry, something went wrong (D-B)',
          payload: null
        })
    }
}

module.exports = {
    handleErrors,
}