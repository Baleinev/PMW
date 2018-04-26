import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import ScreenBox from './ScreenBox';

const ScreenGrid = ({screensStatus, onChooseScreen}) => (
    <Grid columns={2} textAlign={'center'} verticalAlign={'middle'} padded>
      {screensStatus.map((status, i) => (
          <Grid.Column key={i} onClick={() => onChooseScreen(i)}>
              <ScreenBox isFree={status} number={i+1} />
          </Grid.Column>
      ))}
    </Grid>
);

export default ScreenGrid;
