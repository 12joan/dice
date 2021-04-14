import React from 'react'

import D4 from 'components/dice/D4'
import D6 from 'components/dice/D6'
import D8 from 'components/dice/D8'
import D10 from 'components/dice/D10'
import D12 from 'components/dice/D12'
import D20 from 'components/dice/D20'
import D100 from 'components/dice/D100'

const dieProps = part => {
  switch (part.dieType) {
    case 'd10':
      return {
        value: part.value % 10,
      }

      break

    case 'd100':
      return {
        tens: String((Math.floor(part.value / 10) * 10) % 100).padEnd(2, '0'),
        units: part.value % 10,
      }

      break

    default:
      return { value: part.value }
  }
}

const RollPart = props => {
  const { part } = props

  return (
    <div className={`${part.used ? '' : 'opacity-50'} me-2 mb-2`}>
      {
        {
          die: () => {
            const DieComponent = { d4: D4, d6: D6, d8: D8, d10: D10, d12: D12, d20: D20, d100: D100 }[part.dieType] || D20
            return <DieComponent {...dieProps(part)} />
          },

          modifier: () => {
            const sign = part.value >= 0 ? '+ ' : '- '
            return <span className="fs-3">{sign + Math.abs(part.value)}</span>
          },
        }[part.type]()
      }
    </div>
  )
}

export default RollPart
