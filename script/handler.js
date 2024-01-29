export default (() => {
  const nameContainer = document.querySelector('.pokemon-name')
  const typeOneContainer = document.querySelector('.type:nth-of-type(1) span')
  const typeTwoContainer = document.querySelector('.type:nth-of-type(2) span')
  const pokemonImage = document.querySelector('.pokemon-image')
  const shinyImage = document.querySelector('.pokemon-image.shiny')
  const buttonsContainer = document.querySelector('.buttons')
  // Define the API URL
  let pokemonNumber = 91;
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
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
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(pokemonData => {
      console.log(pokemonData.types[0].type.name);
      nameContainer.innerHTML = pokemonData.species.name
      typeOneContainer.innerHTML = pokemonData.types[0].type.name
      typeTwoContainer.innerHTML = pokemonData.types[1].type.name
      pokemonImage.src = pokemonData.sprites.other['official-artwork'].front_default
      shinyImage.src = pokemonData.sprites.other['official-artwork'].front_shiny
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
})();