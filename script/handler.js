export default (() => {
  const nameContainer = document.querySelector('.pokemon-name')
  const typeOneContainer = document.querySelector('.type:nth-of-type(1) span')
  const typeTwoContainer = document.querySelector('.type:nth-of-type(2) span')
  const pokemonImage = document.querySelector('.pokemon-image')
  const shinyImage = document.querySelector('.pokemon-image.shiny')
  const buttonsContainer = document.querySelector('.buttons')
  const apiUrlBase = 'https://pokeapi.co/api/v2/pokemon/'
  const apiGeneralQuery = '?limit=2000&offset=0'
  let apiCalls = []
  let pokemonNumber = 91;

  fetch(apiUrlBase+apiGeneralQuery)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let results = data.results 
    console.log(results)
    for (let i = 0; i < results.length; i++) {
      fetch(results[i].url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(pokemonData => {
        if(pokemonData.sprites.other['official-artwork'].front_default) {
          console.log('hola')
          apiCalls[i] = results[i].url;
        }
      })
    }
  })
  .then(_ => {
    console.log(apiCalls)
  })
  .catch(error => {
    console.error('Error:', error);
  })


  loadInfo()
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
    let apiUrl = apiUrlBase + pokemonNumber;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(pokemonData => {
      // console.log(pokemonData.types[0].type.name);
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