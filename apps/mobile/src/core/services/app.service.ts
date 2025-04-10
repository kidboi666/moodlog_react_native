import { STORAGE_KEY } from '@/core/constants/storage'
import { StorageService } from '@/core/services/storage.service'
import type { Settings } from '@/types/app.types'
import type { ISODateString } from '@/types/date.types'
import type { Nullable } from '@/types/utill.types'

export class AppService extends StorageService {
  static async loadSettings(): Promise<Nullable<Settings>> {
    const settings = await AppService.load(STORAGE_KEY.SETTINGS)
    return settings ? settings : null
  }

  static async initSettings(newSettings: Settings): Promise<void> {
    await AppService.save(STORAGE_KEY.SETTINGS, newSettings)
  }

  static async saveSetting<K extends keyof Settings>(
    settings: Settings,
    key: K,
    value: Settings[K],
  ): Promise<void> {
    const newSettings = { ...settings, [key]: value }
    await AppService.save(STORAGE_KEY.SETTINGS, newSettings)
  }

  static async loadFirstLaunchStatus(): Promise<Nullable<ISODateString>> {
    const firstLaunchDate = await AppService.load(STORAGE_KEY.FIRST_LAUNCH)
    return firstLaunchDate ? firstLaunchDate : null
  }

  static async saveFirstLaunchStatus(
    firstLaunchDate: ISODateString,
  ): Promise<void> {
    await AppService.save(STORAGE_KEY.FIRST_LAUNCH, firstLaunchDate)
  }
}
