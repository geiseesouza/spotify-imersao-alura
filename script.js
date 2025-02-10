const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistsContainer = document.getElementById('artists-container')

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`
    fetch(url)
        .then((response) => response.json())
        .then((result)=> result.filter((element)=>element.name.toLowerCase().includes(searchTerm)))
        .then((result) => displayResults(result))
        .catch((erro)=>console.error(erro))
}

function displayResults(result) {
    artistsContainer.innerHTML = '';
    result.forEach(artist => {
        const artistCardHTML = `
        <div class="artist-card">
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" alt="${artist.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <a title="${artist.name}" class="vst" href="#"></a>
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">${artist.genre}</span>
            </div>
        </div>
    `;
    artistsContainer.innerHTML += artistCardHTML;
    });
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if(searchTerm == ''){
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
    }else{
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        requestApi(searchTerm);
    }
    
})