import React from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Label from 'grommet/components/Label';
import Section from 'grommet/components/Section';

export default function Home() {
  return (
    <Box pad='medium'>
      <Columns size='large' masonry={false} justify='center' maxCount={2}>
        <Box pad='medium'>
          <Button onClick={() => console.log('here')} accent={true} label=''>
            <Box pad='large' colorIndex='neutral-1'>
              <Label align='center'>Start a Chatroom</Label>
            </Box>
          </Button>
        </Box>
        <Box pad='medium'>
          <Button onClick={() => console.log('here')} accent={true}>
            <Box pad='large' colorIndex='neutral-1'>
              <Label align='center'>Join a Chatroom</Label>
            </Box>
          </Button>
        </Box>
      </Columns>
    </Box>
  );
};
