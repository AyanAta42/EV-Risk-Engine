export const CAR_ID_PREFIX = 'sim-car-'

export const carId = (index: number) => `${CAR_ID_PREFIX}${index}`

export const SPEED_UNIT = 'kph'

export const formatSpeed = (speed: number) => `${speed} ${SPEED_UNIT}`

export const DEFAULT_CAR_COUNT = 5
