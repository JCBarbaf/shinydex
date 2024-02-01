export default (async () => {
  const nameContainer = document.querySelector('.pokemon-name')
  const typeOneContainer = document.querySelector('.type:nth-of-type(1) span')
  const typeTwoContainer = document.querySelector('.type:nth-of-type(2) span')
  const pokemonImage = document.querySelector('.pokemon-image')
  const shinyImage = document.querySelector('.pokemon-image.shiny')
  const buttonsContainer = document.querySelector('.buttons')
  const apiUrlBase = 'https://pokeapi.co/api/v2/pokemon/?limit=2000&offset=0'
  // let apiCalls = []
  let pokemonNumber = 1016;

  try{
    const response =  await fetch(apiUrlBase)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json()
    let results = data.results 

    var apiCalls = await Promise.all(
      results.map( async (result, index) => {
        const response = await fetch(result.url);
        const pokemonData = await response.json();

        if (typeof pokemonData.sprites.other['official-artwork'].front_default === 'string') {
          return result.url;
        }
      }
    ))
    apiCalls = apiCalls.filter(call => call !== undefined);
    loadInfo()

  }catch(error){
    console.log(error)
  }

  buttonsContainer?.addEventListener('click', (event) => {
    if (event.target.closest('.next')) {
      pokemonNumber++
      loadInfo()
    }
    if (event.target.closest('.previous')) {
      pokemonNumber--
      loadInfo()
    }
  })

  function loadInfo() {
    let apiUrl = apiCalls[pokemonNumber]
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(pokemonData => {
      nameContainer.innerHTML = pokemonData.species.name
      typeOneContainer.innerHTML = pokemonData.types[0].type.name
      if (pokemonData.types[1]) {
        typeTwoContainer.innerHTML = pokemonData.types[1].type.name
      } else {
        typeTwoContainer.innerHTML = 'none'
      }
      pokemonImage.src = pokemonData.sprites.other['official-artwork'].front_default
      shinyImage.src = pokemonData.sprites.other['official-artwork'].front_shiny
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
})();