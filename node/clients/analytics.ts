import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import { getRandomNumber } from '../utils/randomNumber'

export default class Analytics extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.analytics@0.x', context, options)
  }

  public async getLiveUsers(): Promise<LiveUsersProduct[]> {
    let liveUsers: LiveUsersProduct[] = []
    let productsQdt = getRandomNumber(1, 10)
    for (productsQdt; productsQdt > 0; productsQdt--) {
      liveUsers.push({
        slug: Math.floor(Math.random() * (2000 - 1000 + 1) + 1000).toString(),
        liveUsers: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      })
    }
    return liveUsers
  }
}

interface LiveUsersProduct {
  slug: string
  liveUsers: number
}
