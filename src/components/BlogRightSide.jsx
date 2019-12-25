import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import store from '../store/index.js'
import axios from 'axios'

export class BlogRightSide extends React.Component {
  handleItemClick = (e, { name }) => {
    if (name === 'maxPaperContent') {
      const action = {
        type: 'paperContentMax',
        value: ''
      }
      store.dispatch(action)
    }
    if (name === 'like') {
      axios({
        method: 'post',
        url: `http://104.45.130.215:8963/papers/${
          store.getState().openPaperList[store.getState().activeIndex].id
        }/paper_like/`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        auth: {
          username: 'django',
          password: 'django'
        }
      })
        .then(function(res) {
          const action = {
            type: 'likePaper',
            value: {
              paper_id: store.getState().openPaperList[
                store.getState().activeIndex
              ].paperId
            }
          }
          store.dispatch(action)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }

  render() {
    return (
      <Menu icon vertical className="blog-right-side-menu-bar">
        <Menu.Item name="maxPaperContent" onClick={this.handleItemClick}>
          <Icon name="window maximize" />
        </Menu.Item>
        <Menu.Item name="like" onClick={this.handleItemClick}>
          <Icon name="heart" />
        </Menu.Item>

        <Menu.Item name="website" onClick={this.handleItemClick}>
          <Icon name="globe" />
        </Menu.Item>

        <Menu.Item name="github" onClick={this.handleItemClick}>
          <Icon name="github" />
        </Menu.Item>

        <Menu.Item name="datasource" onClick={this.handleItemClick}>
          <Icon name="database" />
        </Menu.Item>
        <Menu.Item name="facebook" onClick={this.handleItemClick}>
          <Icon name="facebook" />
        </Menu.Item>
        <Menu.Item name="twitter" onClick={this.handleItemClick}>
          <Icon name="twitter" />
        </Menu.Item>
        <Menu.Item name="bookmark" onClick={this.handleItemClick}>
          <Icon name="bookmark outline" />
        </Menu.Item>
      </Menu>
    )
  }
}
