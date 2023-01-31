export type Person = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: []
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export type WeightOnPlanet = {
  planet_id: number
  name: number
  weight: number
  gravity: number
  homeworld_planet: boolean
}
