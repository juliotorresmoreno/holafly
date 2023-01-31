import { WeightOnPlanet } from './types'

export class AbstractPeople {
  constructor(id: number)

  init(): Promise<void>

  getId(): number
  getName(): string
  getMass(): number
  getHeight(): number
  getHomeworlId(): number

  getWeightOnPlanet(planetId: number): Promise<WeightOnPlanet>
}
