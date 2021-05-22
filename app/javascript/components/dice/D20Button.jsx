import * as React from "react";

function SvgD20Button(props) {
  return (
    <div className="graphical-die-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 57.634 57.634"
        {...props}
      >
        <path
          d="M29.317 8.617l17.926 10.35v20.7l-17.926 10.35-17.927-10.35v-20.7l17.927-10.35z"
          fill="currentColor"
        />

        <path
          d="M29.317 8.617l17.926 10.35v20.7l-17.926 10.35-17.927-10.35v-20.7l17.927-10.35z"
          stroke="#404040"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div className="graphical-die-button-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 57.634 57.634"
          {...props}
        >
          <path
            d="M18.319 36.505q.097-1.807.747-3.144.649-1.338 2.534-2.432l1.875-1.084q1.26-.732 1.767-1.25.801-.81.801-1.855 0-1.221-.732-1.939-.733-.718-1.953-.718-1.807 0-2.5 1.368-.372.732-.411 2.031H18.66q.03-1.826.674-2.979 1.143-2.031 4.033-2.031 2.403 0 3.511 1.299t1.108 2.891q0 1.679-1.181 2.871-.684.693-2.451 1.679l-1.338.743q-.957.527-1.504 1.005-.977.85-1.231 1.885h7.637v1.66zM34.227 22.521q2.715 0 3.926 2.236.937 1.729.937 4.737 0 2.851-.85 4.716-1.23 2.676-4.023 2.676-2.52 0-3.75-2.188-1.025-1.826-1.025-4.902 0-2.382.615-4.091 1.152-3.184 4.17-3.184zm-.02 12.763q1.367 0 2.178-1.211.81-1.21.81-4.511 0-2.383-.585-3.921-.586-1.538-2.276-1.538-1.553 0-2.27 1.46-.718 1.46-.718 4.302 0 2.138.459 3.437.703 1.982 2.402 1.982z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default SvgD20Button;