import React from 'react';
import {Header, Modal, Button, Icon} from 'semantic-ui-react';


export default class BanModal extends React.Component {

  constructor(props) {
    super();

    this.state = {
      isOpen: props.isOpen,
    }
  }

  render() {
    return (
        <Modal
            open={this.state.isOpen}
            onClose={this.props.handleClose}
            basic
        >
          <Header style={{
            marginTop: '40vh',
          }} icon='warning sign' content={this.props.title} />
          <Modal.Content >
            <h3>{this.props.message}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.props.handleClose} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
};
