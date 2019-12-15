import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export class BlogRightSide extends React.Component {
  state = { activeItem: 'gamepad' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu icon vertical className="blog-right-side-menu-bar">
        <Menu.Item
          name="gamepad"
          active={activeItem === 'gamepad'}
          onClick={this.handleItemClick}
        >
          <Icon name="heart" />
        </Menu.Item>

        <Menu.Item
          name="video camera"
          active={activeItem === 'video camera'}
          onClick={this.handleItemClick}
        >
          <Icon name="globe" />
        </Menu.Item>

        <Menu.Item
          name="video play"
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name="github" />
        </Menu.Item>

        <Menu.Item
          name="video play"
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name="database" />
        </Menu.Item>
        <Menu.Item
          name="video play"
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name="facebook" />
        </Menu.Item>
        <Menu.Item
          name="video play"
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name="twitter" />
        </Menu.Item>
        <Menu.Item
          name="bookmark"
          active={activeItem === 'video play'}
          onClick={this.handleItemClick}
        >
          <Icon name="bookmark outline" />
        </Menu.Item>
      </Menu>
    )
  }
}
