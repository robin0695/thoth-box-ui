import React from 'react'
import { Tab } from 'semantic-ui-react'
import Iframe from 'react-iframe'
import paperContentStore from '../store/index.js'
import './BlogPaperContentComponent.css'

export class BlogPaperContentComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = paperContentStore.getState()
    this.handleTabChange = this.handleTabChange.bind(this)
    paperContentStore.subscribe(() =>
      this.setState(paperContentStore.getState())
    )
  }

  handleNormalClick(e, element) {
    const action = {
      type: 'switchOpenPaper',
      value: element
    }
    paperContentStore.dispatch(action)
    console.log(element)
  }

  handleClick(e, file_name) {
    e.preventDefault()
    if (e.nativeEvent.which === 1) {
    } else if (e.nativeEvent.which === 3) {
      const action = {
        type: 'closePaperItem',
        value: {
          file_name: file_name
        }
      }
      paperContentStore.dispatch(action)
    }
  }

  handleTabChange(e, data) {
    this.setState({ activeIndex: data.activeIndex })
  }
  generatePaperPanes(openPaperList) {
    let contentList = []
    openPaperList.forEach(element => {
      let htmlFileName = element.file_name.split('/')[
        element.file_name.split('/').length - 1
      ]

      contentList.push({
        menuItem: {
          key: element.file_name,
          content: element.paper_title,
          onClick: e => this.handleNormalClick(e, element),
          onContextMenu: e => this.handleClick(e, element.file_name)
        },
        render: () => {
          return (
            <Tab.Pane attached={false} stretched="true">
              <Iframe
                url={`http://104.45.130.215:9963/${htmlFileName}.html`}
                width="100%"
                height="1400px"
                id="myId"
                allow="fullscreen"
                className="blog-paper-content-iframe"
                display="initial"
                position="relative"
                overflow="hidden"
                loading="auto"
              />
            </Tab.Pane>
          )
        }
      })
    })
    return contentList
  }

  render() {
    return (
      <Tab
        className="paper-tabs"
        menu={{ secondary: true, pointing: true }}
        activeIndex={this.state.activeIndex}
        panes={this.generatePaperPanes(this.state.openPaperList)}
        onTabChange={this.handleTabChange}
      />
    )
  }
}
