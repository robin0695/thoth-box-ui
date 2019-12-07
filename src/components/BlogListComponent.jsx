import React from 'react'
import { Container, Header, List, Item, Icon, Label, Button, Comment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import './BlogComponent.css'
import store from '../store/index.js'
export class BlogListComponent extends React.Component {
  constructor() {
    super()
    this.openPaperHtml = this.openPaperHtml.bind(this)
    this.state = {
      paperList: [
        {
          0: {
            id: 0,
            is_recommanded: false,
            page_comments: '',
            paper_id: '',
            paper_link: '',
            paper_title: '',
            recommand_by: '',
            recommand_reason: '',
            summary: '',
            authors: [
              'robin li',
              'wang wei'
            ]
          }
        }
      ]
    }
  }

  componentDidMount () {
    let t = this
    axios({
      method: 'get',
      url: 'http://104.45.130.215:8963/papers/',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      auth: {
        username: 'django',
        password: 'django'
      }
    }).then(function (res) {
      console.log(res.data.results)
      t.setState({ paperList: res.data.results })
    }).catch(function (error) {
      console.log(error)
    })
  }

  openPaperHtml (e) {
    console.log(e)
  }
  render () {
    return (
      <Item.Group>
        {
          this.state.paperList.map((row, index) => {
            return (
              <Item key={index} className="blog-content-item" onClick={
                () => {
                  const action = {
                    type: 'openPaperItem',
                    value: {
                      paperTitle: row.paper_title,
                      fileName: row.paper_id
                    }
                  }
                  store.dispatch(action)
                }}>
                <Item.Content><Item.Header as='a'>
                  <br />
                  <Label color='grey' ribbon>
                    Version: {row.paper_id === undefined ? row.paper_id : row.paper_id.substr(row.paper_id.length - 2, 2)}
                  </Label>
                  <Header as="h2" className="blog-content-title">{row.paper_title}</Header></Item.Header>
                  <Item.Meta className="paper_author_style">
                    <span className='cinema'>Authors: </span>
                    <List celled horizontal>
                      {
                        row.categories === undefined
                          ? console.log('ignore the empty one.')
                          : row.authors.map((author, index) => {
                            return (
                              <List.Item key={index}>{author} </List.Item>
                            )
                          }
                          )
                      }
                    </List>
                  </Item.Meta>
                  <Item.Description ><Container fluid textAlign='justified' className='blog-content-text'>{row.summary}</Container></Item.Description>
                  <Item.Extra>
                    <span className='cinema'>{row.page_comments}</span>
                  </Item.Extra>

                  <Item.Extra>
                    <span className='cinema'>Categories: </span>
                    <span>
                      {
                        row.categories === undefined
                          ? console.log('ignore the empty one.')
                          : row.categories.map((category, index) => {
                            return (
                              category.is_primary ? <b key={index}>{category.term + ' '}</b> : category.term + ' '
                            )
                          })
                      }
                    </span><br />
                  </Item.Extra>
                  <Divider />
                  <Item.Extra>
                    <span>Tags: </span>
                    <span>
                      <Label as='a' tag> # Machine learning </Label>
                      <Label as='a' tag> # NLP </Label>
                      <Label as='a' tag> # Risk management</Label>
                    </span>
                  </Item.Extra>
                  <Item.Extra>

                    <Comment.Group>
                      <Comment>
                        <br />
                        <Comment.Avatar as='a' src='./thoth/steve.jpg' />
                        <Comment.Content>
                          <Comment.Author>Thoth's Box:
													<Icon name='github square' />
                            <Icon name='twitter square' />
                            <Icon color='grey' name='facebook square' />
                            <Icon name='globe' />
                            <Icon name='database' />
                          </Comment.Author>
                          <Comment.Text>
                            <ReactMarkdown
                              source={' - (1) it generalizes better than networks trained using only the log-likelihood criterion, and\n - (2) it generates longer, more informative and more diverse responses with high utterance and topic relevance even with limited training data'}
                            />
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            <Comment.Action> <Icon name='expand' /> Full-screen </Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                    <Button basic size='mini' content='View' icon='eye' label={{ as: 'a', basic: true, content: '1,048' }} labelPosition='right' />
                    <Button basic size='mini' content='Like' icon='heart' label={{ as: 'a', basic: true, content: '2,08' }} labelPosition='right' />
                    <Button basic size='mini' content='Comments' icon='comment' label={{ as: 'a', basic: true, content: '23' }} labelPosition='right' />
                  </Item.Extra>
                </Item.Content>
              </Item>
            )
          }
          )
        }
      </Item.Group >
    )
  }
}
