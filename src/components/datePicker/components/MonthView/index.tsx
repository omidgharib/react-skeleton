import React from 'react'
import * as PropTypes from 'prop-types'
import clsx from 'clsx'

import Days from './Days'
import Weekdays from './Weekdays'
import WeekNumbers from './WeekNumbers'

import { CALENDAR_TYPES, CALENDAR_TYPE_LOCALES } from '../../constants'
import { tileGroupProps } from '../../types/propTypes'

import type { CalendarType, DeprecatedCalendarType } from '../../types'

function getCalendarTypeFromLocale(locale: string | undefined): CalendarType {
  if (locale) {
    for (const [calendarType, locales] of Object.entries(
      CALENDAR_TYPE_LOCALES
    )) {
      if (locales.includes(locale)) {
        return calendarType as CalendarType
      }
    }
  }

  return CALENDAR_TYPES.ISO_8601
}

type MonthViewProps = {
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType?: CalendarType | DeprecatedCalendarType
  /**
   *  Whether week numbers shall be shown at the left of MonthView or not.
   *
   * @default false
   * @example true
   */
  showWeekNumbers?: boolean
} & Omit<
  React.ComponentProps<typeof Weekdays> &
    React.ComponentProps<typeof WeekNumbers> &
    React.ComponentProps<typeof Days>,
  'calendarType'
>

/**
 * Displays a given month.
 */
const MonthView: React.FC<MonthViewProps> = function MonthView(props) {
  const { activeStartDate, locale, onMouseLeave, showFixedNumberOfWeeks } =
    props
  const {
    calendarType = getCalendarTypeFromLocale(locale),
    formatShortWeekday,
    formatWeekday,
    onClickWeekNumber,
    showWeekNumbers,
    ...childProps
  } = props

  function renderWeekdays() {
    return (
      <Weekdays
        calendarType={calendarType}
        formatShortWeekday={formatShortWeekday}
        formatWeekday={formatWeekday}
        locale={locale}
        onMouseLeave={onMouseLeave}
      />
    )
  }

  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null
    }

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickWeekNumber={onClickWeekNumber}
        onMouseLeave={onMouseLeave}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
      />
    )
  }

  function renderDays() {
    return <Days calendarType={calendarType} {...childProps} />
  }

  const className = 'react-calendar__month-view'

  return (
    <div
      className={clsx(
        className,
        showWeekNumbers ? `${className}--weekNumbers` : ''
      )}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {renderWeekNumbers()}
        <div
          style={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          {renderWeekdays()}
          {renderDays()}
        </div>
      </div>
    </div>
  )
}

MonthView.propTypes = {
  ...tileGroupProps,
  // calendarType: isCalendarType,
  formatDay: PropTypes.func,
  formatLongDate: PropTypes.func,
  formatShortWeekday: PropTypes.func,
  formatWeekday: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
}

export default MonthView
