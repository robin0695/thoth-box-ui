import React, { createRef } from 'react'
import { Grid, Sticky, Ref } from 'semantic-ui-react'
import { MenuExampleStackable } from './TopMenuComponent.jsx'
import { BlogListComponent } from './BlogListComponent.jsx'
import { BlogPaperContentComponent } from './BlogPaperContentComponent.jsx'
import { BlogSearchComponent } from './BlogSearchComponent.jsx'
import { BlogRightSide } from './BlogRightSide.jsx'
import store from '../store/index.js'

export class BlogComponent extends React.Component {
  constructor() {
    super()
    store.subscribe(() => {
      console.log(this.contextRef)
      this.setState(store.getState())
    })
  }

  contextRef = createRef()

  render() {
    return (
      <div>
        <Grid divided>
          <Grid.Row className="blog-header-menu">
            <Grid.Column>
              <MenuExampleStackable />
              <BlogSearchComponent />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid divided className="blog-main-div">
          <Ref innerRef={this.contextRef}>
            <Grid.Row>
              <Grid.Column className="bone-side-menu" width="1"></Grid.Column>
              {store.getState().paperContentMax === false ? (
                <Grid.Column className="blog-main" width="5">
                  <BlogListComponent />
                </Grid.Column>
              ) : (
                ''
              )}
              <Grid.Column
                className="blog-paper-tabs"
                width={store.getState().paperContentSize}
              >
                <Sticky context={this.contextRef} offset={107}>
                  <BlogPaperContentComponent />
                </Sticky>
              </Grid.Column>
              <Grid.Column className="blog-right-menu-bar-base" width="1">
                <Sticky context={this.contextRef} offset={107}>
                  <BlogRightSide />
                </Sticky>
              </Grid.Column>
            </Grid.Row>
          </Ref>
        </Grid>
      </div>
    )
  }
}
