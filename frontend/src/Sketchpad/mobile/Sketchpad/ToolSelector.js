import React from 'react';
import { Button} from 'semantic-ui-react';
import {TOOL_ELLIPSE, TOOL_PENCIL, TOOL_RECTANGLE} from "../../Canvas/tools";

const ToolSelector = ({handleToolChange}) => {

  return (
      <Button.Group buttons={[
        { key: 1, style:{width:'100px', marginLeft:'35px', marginTop:'10px', marginBottom:'10px'}, tool: TOOL_PENCIL, icon: 'pencil', onClick: handleToolChange},
        { key: 2, style:{width:'100px', marginTop:'10px', marginBottom:'10px'}, tool: TOOL_RECTANGLE, icon: 'square outline', onClick: handleToolChange},
        { key: 3, style:{width:'100px', marginTop:'10px', marginBottom:'10px'}, tool: TOOL_ELLIPSE, icon: 'circle outline', onClick: handleToolChange}
      ]}
      />
  )
};

export default ToolSelector;
