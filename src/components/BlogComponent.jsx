import React from 'react'
import { Grid } from 'semantic-ui-react'
import { MenuExampleStackable } from './TopMenuComponent.jsx'
import { BlogListComponent } from './BlogListComponent.jsx'
import { BlogPaperContentComponent } from './BlogPaperContentComponent.jsx'
import { BlogSearchComponent } from './BlogSearchComponent.jsx'

export class BlogComponent extends React.Component {
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
          <Grid.Column className="bone-side-menu" width="1"></Grid.Column>
          <Grid.Column className="blog-main" width="5">
            <BlogListComponent />
          </Grid.Column>
          <Grid.Column className="blog-paper-tabs" width="9">
            <BlogPaperContentComponent />
          </Grid.Column>
          <Grid.Column width="1"></Grid.Column>
        </Grid>
      </div>
    )
  }
}
