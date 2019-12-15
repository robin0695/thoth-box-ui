import React, { createRef } from 'react'
import { Grid, Sticky, Ref } from 'semantic-ui-react'
import { MenuExampleStackable } from './TopMenuComponent.jsx'
import { BlogListComponent } from './BlogListComponent.jsx'
import { BlogPaperContentComponent } from './BlogPaperContentComponent.jsx'
import { BlogSearchComponent } from './BlogSearchComponent.jsx'
import { BlogRightSide } from './BlogRightSide.jsx'

export class BlogComponent extends React.Component {
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
        <Ref innerRef={this.contextRef}>
          <Grid divided className="blog-main-div">
            <Grid.Column className="bone-side-menu" width="1"></Grid.Column>
            <Grid.Column className="blog-main" width="5">
              <BlogListComponent />
            </Grid.Column>
            <Grid.Column className="blog-paper-tabs" width="9">
              <BlogPaperContentComponent />
            </Grid.Column>
            <Grid.Column className="blog-right-menu-bar-base" width="1">
              <Sticky context={this.contextRef} offset={107}>
                <BlogRightSide />
              </Sticky>
            </Grid.Column>
          </Grid>
        </Ref>
      </div>
    )
  }
}
