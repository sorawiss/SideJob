function cutWords (text, maxLength) {

    if (text == null) {
        return ''
    }
    
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'
    }
    
    return text

}

export default cutWords;