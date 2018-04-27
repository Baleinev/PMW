import React from 'react';
import { Button} from 'semantic-ui-react';
import {TOOL_ELLIPSE, TOOL_PENCIL, TOOL_RECTANGLE} from "../../Canvas/tools";

const ToolSelector = ({handleToolChange}) => {

  return (
      <Button.Group buttons={[
        { key: 1, tool: TOOL_PENCIL, icon: 'pencil', onClick: handleToolChange},
        { key: 2, tool: TOOL_RECTANGLE, icon: 'square outline', onClick: handleToolChange},
        { key: 3, tool: TOOL_ELLIPSE, icon: 'circle outline', onClick: handleToolChange}
      ]}
      />
  )
};

export default ToolSelector;
