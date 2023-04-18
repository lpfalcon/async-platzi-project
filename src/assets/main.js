const content = document.getElementById('content')
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCT2Dh6WXU33MgA0vz-tzfIw&part=snippet%2Cid&order=date&maxResults=9'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '614b814f15msh64d198b093aea0ap156fcbjsn3a21a636d746',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fecthData() {
    const response = await fetch(API, options)
    const data = await response.json()
    return data
}

(async () => {
    try {
        const videos = await fecthData()
        console.log(videos)
        let view = `${videos.items.map(video => `
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
            <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
            </div>
        </a>
    `).join('')}
    `;
        content.innerHTML = view
    } catch (err) {
        console.log(err)
        const error = ` <h3 class="text-sm text-gray-700"> ERROR AL OBTENER DATOS  </h3>`
        content.innerHTML = error
    }
})()