import React, { Component } from 'react';
import Modal from 'react-modal';

class MobileModal extends Component {
    render() {
        return (
            <Modal id="Mobile-Modal" isOpen={ this.props.isOpen } ariaHideApp={false}>
                <div className="Modal-Title-Container">
                    <h2>No Way, Jose</h2>
                </div>
                <div className="Modal-Content-Container">
                    <p>You'll need a bigger device to truly appreciate the k-means algorithm. A laptop, at least.</p><br />
                    <p>Nice try, though.</p>
                </div>
            </Modal>

        );
    }
}

export default MobileModal;