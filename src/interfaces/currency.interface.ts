export interface IBaseCurrency {
  ip_address: string
  city: string
  city_geoname_id: number
  region: string
  region_iso_code: string
  region_geoname_id: number
  postal_code: string
  country: string
  country_code: string
  country_geoname_id: number
  country_is_eu: boolean
  continent: string
  continent_code: string
  continent_geoname_id: number
  longitude: number
  latitude: number
  security: ISecurity
  timezone: ITimezone
  flag: IFlag
  currency: ICurrency
  connection: IConnection
}

export interface ISecurity {
  is_vpn: boolean
}

export interface ITimezone {
  name: string
  abbreviation: string
  gmt_offset: number
  current_time: string
  is_dst: boolean
}

export interface IFlag {
  emoji: string
  unicode: string
  png: string
  svg: string
}

export interface ICurrency {
  currency_name: string
  currency_code: string
}

export interface IConnection {
  autonomous_system_number: number
  autonomous_system_organization: string
  connection_type: string
  isp_name: string
  organization_name: string
}

export interface ICurrencyRates {
  base: string
  last_updated: number
}

export interface ICurrencyList {
  data: ICurrencyData
}

export interface ICurrencyData {
  [key: string]: ICurrencyInfo
}

export interface ICurrencyInfo {
  symbol: string
  name: string
  symbol_native: string
  decimal_digits: number
  rounding: number
  code: string
  name_plural: string
}

export interface IExchangeRates {
  meta?: IExchangeMeta
  data: IExchangeData
}

export interface IExchangeMeta {
  last_updated_at: string
}

export interface IExchangeData {
  [key: string]: number
}

export interface IExchangeList {
  nameCurrency: string
  value: number
}
