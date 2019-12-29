import React from 'react'
import _ from 'lodash'
import {
  Container,
  Header,
  List,
  Item,
  Icon,
  Label,
  Button,
  Comment,
  Divider,
  Visibility
} from 'semantic-ui-react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import './BlogComponent.css'
import store from '../store/index.js'
import { baseAPIUrl } from '../config/config.js'

export class BlogListComponent extends React.Component {
  constructor() {
    super()
    this.openPaperHtml = this.openPaperHtml.bind(this)
    this.state = {
      nextListUrl: 'init',
      paperList: []
    }
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  handleUpdate = (e, { calculations }) => {
    setTimeout(() => {
      if (calculations.percentagePassed > 0.8) {
        if (
          store.getState().nextPage !== '' &&
          store.getState().nextPage !== null
        ) {
          console.log(this.state.nextPage)
          axios({
            method: 'get',
            url: this.state.nextPage,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            params: {
              is_recommanded: true
            },
            auth: {
              username: 'django',
              password: 'django'
            }
          })
            .then(function(res) {
              const action = {
                type: 'loadRecommandPaperList',
                value: {
                  paperList: res.data.results,
                  nextPage: res.data.next
                }
              }
              store.dispatch(action)
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      }
    }, 300)
  }

  componentDidMount() {
    if (store.getState().paperList.length > 0) return
    axios({
      method: 'get',
      url: `${baseAPIUrl}/papers/`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        is_recommanded: true
      },
      auth: {
        username: 'django',
        password: 'django'
      }
    })
      .then(function(res) {
        const action = {
          type: 'loadRecommandPaperList',
          value: {
            paperList: res.data.results,
            nextPage: res.data.next
          }
        }
        store.dispatch(action)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  paperLike(paper_id, row_id) {
    // console.log(`http://104.45.130.215:8963/papers/${row_id}/paper_like`)
    axios({
      method: 'post',
      url: `${baseAPIUrl}/papers/${row_id}/paper_like/`,
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
            paper_id: paper_id
          }
        }
        store.dispatch(action)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  viewPaper = row => {
    const action = {
      type: 'openPaperItem',
      value: {
        paperTitle: row.paper_title,
        fileName: row.paper_id,
        id: row.id,
        paperId: row.paper_id
      }
    }
    store.dispatch(action)

    axios({
      method: 'get',
      url: `${baseAPIUrl}/papers/${row.id}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      auth: {
        username: 'django',
        password: 'django'
      }
    }).then(function(res) {
      console.log('For paper view count.')
    })
  }

  openPaperHtml(e) {
    console.log(e)
  }

  render() {
    return (
      <Item.Group>
        <Visibility onUpdate={_.debounce(this.handleUpdate, 500)}>
          {store.getState().paperList.map((row, index) => {
            return (
              <Item key={index} className="blog-content-item">
                <Item.Content>
                  <Item.Header as="a" onClick={this.viewPaper.bind(this, row)}>
                    <br />
                    <Label color="grey" ribbon>
                      Version:{' '}
                      {row.paper_id === undefined
                        ? row.paper_id
                        : row.paper_id.substr(row.paper_id.length - 2, 2)}
                    </Label>
                    <Header as="h2" className="blog-content-title">
                      {row.paper_title}
                    </Header>
                  </Item.Header>
                  <Item.Meta className="paper_author_style">
                    <span className="cinema">Authors: </span>
                    <List celled horizontal>
                      {row.categories === undefined
                        ? console.log('ignore the empty one.')
                        : row.authors.map((author, index) => {
                            return <List.Item key={index}>{author} </List.Item>
                          })}
                    </List>
                  </Item.Meta>
                  <Item.Description>
                    <Container
                      fluid
                      textAlign="justified"
                      className="blog-content-text"
                    >
                      {row.summary}
                    </Container>
                  </Item.Description>
                  <Divider />
                  <Item.Extra>
                    <span className="cinema">{row.page_comments}</span>
                  </Item.Extra>
                  <br />
                  <Item.Extra>
                    <Label
                      size="mini"
                      as="a"
                      src={row.paper_id}
                      onClick={() => {
                        window.open(row.paper_id)
                      }}
                    >
                      <Icon name="file pdf outline" /> Original Link
                    </Label>
                  </Item.Extra>
                  <Item.Extra>
                    <Comment.Group>
                      <Comment>
                        <br />
                        <Comment.Avatar as="a" src="./thoth/thoth_head.jpeg" />
                        <Comment.Content>
                          <Comment.Author>
                            Thoth's said :-{' '}
                            {row.code_url !== '' ? (
                              <Icon
                                name="github square"
                                onClick={() => {
                                  window.open(row.code_url)
                                }}
                              />
                            ) : (
                              <Icon name="github square" disabled />
                            )}
                            <Icon name="twitter square" disabled />
                            <Icon name="facebook square" disabled />
                            <Icon name="globe" disabled />
                            <Icon name="database" disabled />
                          </Comment.Author>
                          <Comment.Text>
                            <ReactMarkdown
                              // source={' - (1) it generalizes better than networks trained using only the log-likelihood criterion, and\n - (2) it generates longer, more informative and more diverse responses with high utterance and topic relevance even with limited training data'}
                              source={row.recommand_reason}
                            />
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                    <Button
                      color="black"
                      disabled
                      basic
                      size="mini"
                      content="View"
                      icon="eye"
                      label={{ basic: true, content: row.view_count }}
                      labelPosition="right"
                    />
                    <Button
                      basic
                      size="mini"
                      content="Like"
                      icon="heart"
                      label={{ as: 'a', basic: true, content: row.like_count }}
                      labelPosition="right"
                      onClick={this.paperLike.bind(this, row.paper_id, row.id)}
                    />
                  </Item.Extra>
                </Item.Content>
              </Item>
            )
          })}
        </Visibility>
      </Item.Group>
    )
  }
}
