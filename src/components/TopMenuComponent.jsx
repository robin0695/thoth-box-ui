import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import './TopMenuComponent.css'

export class MenuExampleStackable extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
    console.log(e)
  }

  render () {
    const { activeItem } = this.state
    return (
      <Menu stretched="true" className="thoth-header-menu">
        <Menu.Item>
          <Image src='./thoth/thoth-logo.jpeg' circular={true} size="mini" ></Image>
        </Menu.Item>

        <Menu.Item
          name='features'
          className="top-memu-title"
        >
          Thoth's Box
  			</Menu.Item>

        <Menu.Item
          name='testimonials'
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          About Us
  			</Menu.Item>

        <Menu.Item
          name='sign-in'
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          Blog
  			</Menu.Item>
        <Menu.Item
          name='admin'
          active={activeItem === 'admin'}
          onClick={this.handleItemClick}
        >
          Admin
  			</Menu.Item>
      </Menu>
    )
  }
}
