import React from 'react';

interface ITooltip {
  tooltipRef: React.Ref<any>
}
const Tooltip: React.FC<ITooltip> = ({ tooltipRef }) => (
  <div className="tooltip hidden" ref={tooltipRef} />
);

export default Tooltip;