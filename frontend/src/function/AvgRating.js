const avgRating = (review) => {

    if (review == null) {
        return "No rating"
    }

    if (review.length === 0) return null
    let sum = 0
    for (let i = 0; i < review.length; i++) {
        sum += review[i].rating
    }
    return (sum / review.length).toFixed(2)
}

export default avgRating;