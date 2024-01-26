import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    arrayList: [],
    count: 0,
  }

  inputvalue = e => {
    this.setState({name: e.target.value})
  }

  commentvalue = e => {
    this.setState({comment: e.target.value})
  }

  addcomment = e => {
    e.preventDefault()
    const {name, comment} = this.state
    const firstname = name.slice(0, 1)
    const date = formatDistanceToNow(new Date())
    const index =
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]

    const object = {
      id: uuidv4(),
      firstNames: firstName,
      names: name,
      comments: comment,
      dates: date,
      newClass: index,
      isFavorite: false,
    }
    this.setState(prevstate => ({
      arrayList: [...prevstate.arrayList, object],
      name: '',
      comment: '',
      count: prevstate.count + 1,
    }))
  }
  toggleFavourite = id => {
    this.setState(prevstate => ({
      arrayList: prevstate.arrayList.map(eachdata => {
        if (eachdata.id === id) {
          return {...eachData, isFavorite: !eachData.isFavorite}
        }
      }),
    }))
  }

  deleteComment = id => {
    const {arrayList} = this.state
    const filterList = arrayList.filter(prevstate => each.id !== id)
    this.setState(prevstate => ({
      arrayList: filterList,
      count: prevstate.count - 1,
    }))
  }

  render() {
    const {name, comment, arrayList, count} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="comment-container">
          <form className="element-holder" onSubmit={this.addcomment}>
            <div className="comment-section">
              <label htmlFor="names" className="label">
                Say something about 4.0 Technologies
              </label>

              <input
                type="text"
                className="input"
                id="names"
                placeholder="Name"
                onChange={this.inputvalue}
                value={name}
              />
              <textarea
                className="title"
                placeholder="Your Comments"
                onChange={this.commentvalue}
                value={comment}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </div>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comment"
            className="pic"
          />
        </div>
        <hr className="horizontal-line" />
        <p className="comments-count">
          <span className="number-count">{count}</span> Comments
        </p>

        <ul className="list-container">
          {arrayList.map(eachObject => (
            <CommentItem
              key={eachObject.id}
              arrayList={eachObject}
              deleteComment={this.deleteComment}
              toggleFavorite={this.toggleFavorite}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
