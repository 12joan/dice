import React from 'react'
import RollPart from 'components/RollPart'

class RollLog extends React.Component {
  constructor(props) {
    super(props)

    this.scrollEl = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rollData.length > prevProps.rollData.length) {
      // Scroll to most recent
      this.scrollEl.current.scrollTo(0, 0)
    }
  }

  render() {
    const prefersRollAnimation = this.props.eventDelegate.getUserPreference('prefersRollAnimation')

    let previousName = undefined

    return (
      <div ref={this.scrollEl} className="flex-grow-1 bg-light p-3 overflow-scroll d-flex flex-column-reverse" aria-label="Roll log">
        <div>
          <div className="visually-hidden-focusable" id="top-of-roll-log">
            This is the top of the roll log. <a href="#bottom-of-roll-log">Skip to most recent</a>
          </div>

          <div className="text-center text-secondary mt-3">
            <h3>Thanks for joining</h3>
            <p className="lead">Room ID <span className="font-monospace">{this.props.roomId}</span></p>
          </div>

          {
            this.props.rollData.map((data, i) => {
              const { name } = data.user

              const showName = name !== previousName

              previousName = name

              return (
                <div key={i}>
                  {
                    showName && (
                      <h2 className="text-secondary fs-5 fw-normal mt-4">{name}</h2>
                    )
                  }

                  <div className="mt-2">
                    <div className={`${prefersRollAnimation ? 'shimmer' : ''} p-1 m-n1 rounded`}>
                      <div className="card card-body" aria-label={ `Dice roll ${data.roll.name || ''} ${data.roll.result.value}` } tabIndex="0">
                        {
                          data.roll.name !== null && (
                            <h4 className="mb-2">{`${data.roll.name} (${data.roll.result.value})`}</h4>
                          )
                        }

                        <div className="d-flex justify-content-between my-2" aria-label={`Individual die images. Roll result is ${data.roll.result.value}`}>
                          <div className="d-flex flex-wrap align-items-center">
                            {
                              data.roll.result.parts.map((part, i) => (
                                <RollPart key={i} part={part} />
                              ))
                            }
                          </div>

                          {
                            data.roll.name === null && (
                              <span className="fs-2 text-nowrap" aria-label={ `Roll result ${data.roll.result.value}` }>({data.roll.result.value})</span>
                            )
                          }
                        </div>

                        <div className="text-muted">
                          {data.roll.result.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

          <div className="visually-hidden-focusable" id="bottom-of-roll-log">
            This is the bottom of the roll log. <a href="#top-of-roll-log">Skip to oldest</a>
          </div>
        </div>
      </div>
    )
  }
}

export default RollLog
