import React from 'react'

function Post() {

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            fetch('http://localhost:3333/posts').then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)
    
    return (
        <div>Post</div>
    )
}

export default Post