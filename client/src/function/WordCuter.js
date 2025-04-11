function cutWords (text, maxLength) {

    if (text == null) {
        return ''
    }

    if (maxLength == true) {
        return text
    }
    
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...อ่านต่อ'
    }
    
    return text

}

export default cutWords;