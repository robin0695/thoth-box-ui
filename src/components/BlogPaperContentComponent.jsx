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
    console.log(element)
  }

  handleClick(e, fileName) {
    e.preventDefault()
    if (e.nativeEvent.which === 1) {
    } else if (e.nativeEvent.which === 3) {
      const action = {
        type: 'closePaperItem',
        value: {
          fileName: fileName
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
      let htmlFileName = element.fileName.split('/')[
        element.fileName.split('/').length - 1
      ]

      contentList.push({
        menuItem: {
          key: element.fileName,
          content: element.paperTitle,
          onClick: e => this.handleNormalClick(e, element),
          onContextMenu: e => this.handleClick(e, element.fileName)
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
