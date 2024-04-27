import React from "react";

const SvgrMock = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props} />
));
SvgrMock.displayName = "SvgrMock";

export const ReactComponent = SvgrMock;
export default SvgrMock;
