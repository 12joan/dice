import React from 'react'
import { ArrowCounterclockwise, HeartFill, PencilSquare, BoxArrowUpRight } from 'react-bootstrap-icons'

const Row = props => {
  return (
    <li>
      <button type="button" className="dropdown-item d-flex" onClick={props.onClick}>
        <span className="mx-1">{props.icon}</span>
        <span className="mx-1 flex-grow-1 text-wrap">{props.text}</span>
        <span className="mx-1 text-muted">{props.subtext}</span>
        <span className="mx-1">{props.editButton}</span>
      </button>
    </li>
  )
}

Row.defaultProps = {
  subtext: '',
  editButton: <></>,
  onclick: () => {},
}

const RollMenu = props => (
  <ul className={`dropdown-menu ${props.className}`} style={{ width: props.width, maxWidth: '100vw' }}>
    {
      [
        ['2d6 + 1d4 + 3'],
        ['1d100'],
        ['Fireball', '(8d6)'],
        ['1d20 with advantage'],
        ['1d20 + 1'],
      ].map(([text, subtext], i) => (
        <Row
          key={i}
          icon={<ArrowCounterclockwise className="bi text-secondary" />}
          text={text}
          subtext={subtext}
          onClick={() => props.eventDelegate.performRoll({ name: null, notation: '1d4' })} />
      ))
    }

    <li><hr className="dropdown-divider" /></li>

    {
      [
        ['Dexterity save', '(1d20 + 5)'],
        ['Longsword attack', '(1d20 - 1)'],
        ['Longsword damage', '(1d8)'],
      ].map(([text, subtext], i) => (
        <Row
          key={i}
          icon={<HeartFill className="bi text-success" />}
          text={text}
          subtext={subtext}
          editButton={<PencilSquare className="bi text-primary" />}
          onClick={() => props.eventDelegate.performRoll({ name: null, notation: '1d4' })} />
      ))
    }

    <li><hr className="dropdown-divider" /></li>

    <Row
      icon={<BoxArrowUpRight className="bi" />}
      text="Custom dice roll"
      onClick={() => props.eventDelegate.performRoll({ name: null, notation: '1d4' })} />
  </ul>
)

RollMenu.defaultProps = {
  className: '',
}

export default RollMenu