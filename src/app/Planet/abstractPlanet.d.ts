export class AbstractPlanet {
  constructor(id: number)

  init(): Promise<void>

  getId(): number
  getName(): string
  getGravity(): number
}
