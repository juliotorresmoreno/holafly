export interface Planet {
  id: number
  name: string
  gravity: number
  lang: string
}

export interface WeightOnPlanetRandom {
  planet_id: number
  name: string
  weight: number
  gravity: number
  homeworld_planet: boolean
}

export interface Person {
  id: number
  name: string
  mass: number
  height: number
  homeworld: Planet
  lang: string
}

export interface Header {
  'user-agent': string
  'accept-encoding': string
  host: string
  connection: string
  [x: string]: string
}

export interface Log {
  id: number
  action: string
  header: Header
  ip: string
  createdAt: Date
  updatedAt: Date
}

export interface TestApi {
  people: string
  planets: string
  films: string
  species: string
  vehicles: string
  starships: string
}
