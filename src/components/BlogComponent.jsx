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
            </Grid.Column>
            <Grid.Column only="tablet computer">
              <BlogSearchComponent />
            </Grid.Column>
            <Grid.Column only="tablet computer" width="1"></Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid divided className="blog-main-div">
          <Ref innerRef={this.contextRef}>
            <Grid.Row stretched>
              <Grid.Column className="bone-side-menu" width="1"></Grid.Column>
              {store.getState().paperContentMax === false ? (
                <Grid.Column
                  className="blog-main"
                  largeScreen="5"
                  widescreen="5"
                  tablet="5"
                  mobile="14"
                >
                  <BlogListComponent />
                </Grid.Column>
              ) : (
                ''
              )}

              <Grid.Column
                className="blog-paper-tabs"
                stretched
                largeScreen={store.getState().paperContentSize}
                widescreen={store.getState().paperContentSize}
                only="tablet computer"
              >
                <Sticky context={this.contextRef} offset={67}>
                  <BlogPaperContentComponent />
                </Sticky>
              </Grid.Column>
              <Grid.Column
                className="blog-right-menu-bar-base"
                largeScreen="1"
                only="tablet computer"
              >
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
