export interface IMarket {
  id: number
  all_time_high?: string
  circulating_supply?: string
  code?: string
  currency1?: object
  currency2?: object
  for_test?: boolean
  internal_price_info?: object
  market_cap?: string
  order_book_info?: object
  otc_buy_percent?: string
  otc_market?: boolean
  otc_max_buy_amount?: string
  otc_max_sell_amount?: string
  otc_sell_percent?: string
  price?: string
  price_info?: object
  text?: string
  title?: string
  title_fa?: string
  tradable?: boolean
  trading_view_source?: string
  trading_view_symbol?: string
  volume_24h?: string
}
