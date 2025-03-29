function cutWords (text) {

    const maxLength = 54

    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'
    }
    
    return text

}

export default cutWords;