import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import axios from 'axios'
import store from '../store/index.js'
import './BlogSearchComponent.css'
import { baseAPIUrl } from '../config/config.js'

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ title, description }) => (
  <div>
    <p style={{ fontSize: 15, fontWeight: 'bold' }}>{title}</p>
    <p style={{ fontSize: 12, fontWeight: 'normal' }}>{description}</p>
  </div>
)

export class BlogSearchComponent extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    const action = {
      type: 'openPaperItem',
      value: {
        paperTitle: result.title,
        fileName: result.id
      }
    }
    store.dispatch(action)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: false, value })
    if (this.state.value.length < 3) return
    else this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      let t = this
      let tempResults = []
      axios({
        method: 'get',
        url: `${baseAPIUrl}/paper/search/`,
        params: { text: this.state.value },
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        auth: {
          username: 'django',
          password: 'django'
        }
      })
        .then(function(res) {
          res.data.results.map(item => {
            tempResults.push({
              title: item.paper_title,
              description: item.summary.substr(0, 200) + '...',
              id: item.paper_id
            })
            return tempResults
          })
          t.setState({
            isLoading: false,
            results: tempResults
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid.Column width={16}>
        <Search
          aligned="right"
          minCharacters={3}
          fluid={true}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          resultRenderer={resultRenderer}
          {...this.props}
        />
      </Grid.Column>
    )
  }
}
