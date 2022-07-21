import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './Profile.css';

class ProfileIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           dropdownOpen: false, 
        }
    }

    toggle = () => {
        //console.log(this.state.dropdownOpen)
        this.setState(prevState => ({
            ...prevState,
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    render(){
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle 
                        tag="span" 
                        data-toggle="dropdown" 
                        aria-expanded={this.state.dropdownOpen}
                    >
                            <img
                                src="http://tachyons.io/img/logo.jpg"
                                className="br-100 ba h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu 
                        end 
                        className="b--transparent shadow-5 mt20" 
                        style={{ backgroundColor: 'rgba(255,255,255,0.5)'}}
                    >
                        <DropdownItem onClick={this.props.toggleModal}>View profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Signout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </div>
        )
    }

}

export default ProfileIcon;