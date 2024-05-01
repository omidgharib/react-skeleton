import React from 'react'
import PropTypes from 'prop-types'

import Years from './Years'

import { tileGroupProps } from '../../types/propTypes'

type DecadeViewProps = React.ComponentProps<typeof Years>

/**
 * Displays a given decade.
 */
const DecadeView: React.FC<DecadeViewProps> = function DecadeView(props) {
    function renderYears() {
        return <Years {...props} />
    }

    return <div className='react-calendar__decade-view'>{renderYears()}</div>
}

DecadeView.propTypes = {
    ...tileGroupProps,
    showNeighboringDecade: PropTypes.bool,
}

export default DecadeView
