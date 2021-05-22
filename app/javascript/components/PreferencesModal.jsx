import React from 'react'
import Modal from 'bootstrap/js/dist/modal'

const PreferencesCheckbox = props => (
  <div className={`form-check ${props.className || ''}`}>
    <input
      className="form-check-input"
      id={`preferences-${props.name}`}
      type="checkbox"
      checked={props.eventDelegate.getUserPreference(props.name)}
      onChange={event => props.eventDelegate.setUserPreference(props.name, event.target.checked)} />

    <label className="form-check-label" htmlFor={`preferences-${props.name}`}>{props.label}</label>
  </div>
)

const PreferencesSlider = props => {
  const value = props.eventDelegate.getUserPreference(props.name)

  return (
    <div className={props.className}>
      <label className="form-label" htmlFor={`preferences-${props.name}`}>{props.label} ({value})</label>

      <input
        className="form-range" 
        id={`preferences-${props.name}`}
        type="range"
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={event => props.eventDelegate.setUserPreference(props.name, event.target.value)} />
    </div>
  )
}

class PreferencesModal extends React.Component {
  constructor(props) {
    super(props)

    this.modalRef = React.createRef()
  }

  componentDidMount() {
    this.bootstrapModal = new Modal(this.modalRef.current, {})
  }

  show() {
    this.bootstrapModal.show()
  }

  render() {
    return (
      <div ref={this.modalRef} className="modal fade" id="preferences-modal" tabIndex="-1" aria-label="User preferences" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body container-fluid">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h2 className="m-0">User preferences</h2>
                </div>

                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-white"
                    onClick={() => this.bootstrapModal.hide()}>
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-3" />

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="prefersRollAnimation"
                label="Show animation for new dice rolls" />

              <PreferencesCheckbox
                eventDelegate={this.props.eventDelegate}
                name="prefersGraphicalDiceButtons"
                label="Show dice buttons as icons instead of text" />

              {
                this.props.eventDelegate.getUserPreference('prefersGraphicalDiceButtons') && (
                  <PreferencesSlider
                    eventDelegate={this.props.eventDelegate}
                    name="graphicalDiceButtonSize"
                    className="mt-3"
                    label="Dice button size"
                    min={1}
                    max={10}
                    step={0.1} />
                )
              }

              <fieldset className="mt-3">
                <legend className="fs-6">Show and hide dice buttons</legend>

                <div className="card card-body">
                  <div className="row mx-0 gx-5">
                    {
                      ['d20', 'd4', 'd6', 'd8', 'd10', 'd12', 'd100'].map(dieType => (
                        <PreferencesCheckbox
                          key={dieType}
                          eventDelegate={this.props.eventDelegate}
                          name={`showDiceButtons[${dieType}]`}
                          className="col-6 col-sm-4 col-lg-3 form-switch"
                          label={dieType} />
                      ))
                    }
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PreferencesModal