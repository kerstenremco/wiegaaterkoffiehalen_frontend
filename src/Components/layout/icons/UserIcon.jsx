import * as React from "react";
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={288} height={288} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={288} height={288} viewBox="0 0 32 32" {...props}>
      <path fill="#f6ddd2" d="M1 7a6 6 0 0 1 6-6h18a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7Z" className="colorFFFADD svgShape" />
      <path
        fill="#3d405b"
        fillRule="evenodd"
        d="M18.162 18.81c.358 0 .649.291.649.65v3.459a.649.649 0 0 1-1.298 0v-3.46c0-.358.291-.648.65-.648Z"
        className="colorFAE780 svgShape"
      />
      <g fill="#3d405b" fillRule="evenodd" className="colorFAE780 svgShape">
        <path
          d="M23.351 18.81c.359 0 .65.291.65.65v3.459a.649.649 0 0 1-1.298 0v-3.46c0-.358.29-.648.648-.648zm-2.594-1.729c.358 0 .648.29.648.649v6.919a.649.649 0 0 1-1.297 0v-6.92c0-.358.29-.648.649-.648z"
          className="color000 svgShape"
        />
        <path
          fill="#e07a5f"
          d="M12.108 6.703a2.378 2.378 0 1 0 0 4.756 2.378 2.378 0 0 0 0-4.756zm-1.73 5.189c-1.313 0-2.378.943-2.378 2.106v4.191c0 .74.678 1.34 1.514 1.34h.216v4.428c0 .74.677 1.34 1.513 1.34h1.73c.836 0 1.513-.6 1.513-1.34v-4.428h.217c.836 0 1.513-.6 1.513-1.34v-4.19c0-1.164-1.065-2.107-2.378-2.107h-3.46z"
          className="colorFFD200 svgShape"
        />
      </g>
    </svg>
  </svg>
);
export default SvgComponent;
