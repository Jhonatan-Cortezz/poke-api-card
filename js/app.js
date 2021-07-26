
document.addEventListener('DOMContentLoaded', () => {
  const ramdomNumber = getRamdomInit(1, 151)
  getDataFromPokeAPI(ramdomNumber)
})

const getRamdomInit = (min, max) => {
  return Math.floor(Math.random() * (max -min)) + min;
}

const getDataFromPokeAPI = async (idPokemon) => {
  try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    const transformDataToJson = await request.json();

    const pokemonData = {
      img: transformDataToJson.sprites.other.dream_world.front_default,
      name: transformDataToJson.name,
      hp: transformDataToJson.stats[0].base_stat,
      experience: transformDataToJson.base_experience,
      atack: transformDataToJson.stats[1].base_stat,
      special: transformDataToJson.stats[3].base_stat,
      defense: transformDataToJson.stats[2].base_stat,
    }
    printCardHTML(pokemonData)
  } catch (error) {
    console.log(error);
  }
}


const printCardHTML = (pokemon) => {
  console.log(pokemon);
  const showTemplateInMain = document.getElementsByClassName('flex')[0]
  const template = document.getElementById('template-card').content
  const cloneTemplate = template.cloneNode(true)
  const fragment = document.createDocumentFragment()

  cloneTemplate.querySelector('.card-body-img').setAttribute('src', pokemon.img)
  cloneTemplate.querySelector('.card-body-tittle').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`
  cloneTemplate.querySelector('.card-body-text').textContent = pokemon.experience + ' Exp'
  cloneTemplate.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.atack
  cloneTemplate.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.special
  cloneTemplate.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defense

  fragment.appendChild(cloneTemplate)
  showTemplateInMain.appendChild(fragment)
}
