import React from 'react'

import Months from './Months'

import { tileGroupProps } from '../../types/propTypes'

type YearViewProps = React.ComponentProps<typeof Months>

/**
 * Displays a given year.
 */
const YearView: React.FC<YearViewProps> = function YearView(props) {
    function renderMonths() {
        return <Months {...props} />
    }

    return <div className='react-calendar__year-view'>{renderMonths()}</div>
}

YearView.propTypes = {
    ...tileGroupProps,
}

export default YearView
