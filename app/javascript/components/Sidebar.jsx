import React from 'react'

const Sidebar = props => (
  <div className="col-4 d-none d-md-block border-end p-3">
    <div className="h-100 d-flex flex-column justify-content-end">
      This sidebar is only visible on viewports md and larger.
    </div>
  </div>
)

export default Sidebar
