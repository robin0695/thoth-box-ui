import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import store from '../store/index.js'
import axios from 'axios'
import { baseAPIUrl } from '../config/config.js'

export class BlogRightSide extends React.Component {
  handleItemClick = (e, { name }) => {
    if (name === 'maxPaperContent') {
      const action = {
        type: 'paperContentMax',
        value: ''
      }
      store.dispatch(action)
    }
    if (name === 'github') {
      console.log(store.getState())
      window.open(store.getState().currentPaper.code_url)
    }
    if (name === 'like') {
      axios({
        method: 'post',
        url: `${baseAPIUrl}/papers/${
          store.getState().currentPaper.id
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
              paper_id: store.getState().currentPaper.paper_id
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

        <Menu.Item name="website" disabled onClick={this.handleItemClick}>
          <Icon name="globe" />
        </Menu.Item>

        {store.getState().currentPaper.code_url === '' ? (
          <Menu.Item name="github" disabled>
            <Icon name="github" />
          </Menu.Item>
        ) : (
          <Menu.Item name="github" onClick={this.handleItemClick}>
            <Icon name="github" />
          </Menu.Item>
        )}

        <Menu.Item name="datasource" disabled>
          <Icon name="database" />
        </Menu.Item>
        <Menu.Item name="facebook" disabled>
          <Icon name="facebook" />
        </Menu.Item>
        <Menu.Item name="twitter" disabled>
          <Icon name="twitter" />
        </Menu.Item>
        <Menu.Item name="bookmark" disabled>
          <Icon name="bookmark outline" />
        </Menu.Item>
      </Menu>
    )
  }
}
