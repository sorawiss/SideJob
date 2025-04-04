function cutWords (text, maxLength) {

    if (text == null) {
        return ''
    }

    if (maxLength == true) {
        return text
    }
    
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'
    }
    
    return text

}

export default cutWords;