import React, {Component, PropTypes} from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router';


class PostItem extends Component {

  static propTypes = {
    id: PropTypes.string,
    link: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    user: PropTypes.shape({
      username: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
    insertedAt: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    isDetail: PropTypes.bool
  }

  handleLike() {
    ReactGA.event({
      category: this.props.isDetail ? 'PostDetail' : 'PostList',
      action: 'clickLikeButton',
    });
  }

  handleComment() {
    ReactGA.event({
      category: this.props.isDetail ? 'PostDetail' : 'PostList',
      action: 'clickCommentButton',
    });
  }

  handleClickTag() {
    ReactGA.event({
      category: this.props.isDetail ? 'PostDetail' : 'PostList',
      action: 'clickTagButton',
    });
  }

  render() {
    return  (
      <div className="post-item">
        {
          this.props.isDetail
          ? (
            <a href={this.props.link} target="_about">
              <div className="post-thumbnail">
                <img src={this.props.thumbnailUrl || this.props.user.imageUrl} />
              </div>
              <div className="post-content">
                <span className="post-title">{this.props.title}</span>
                <span className="post-description">{this.props.insertedAt}</span>
              </div>
            </a>
          )
          : (
            <Link to={`/posts/${this.props.id}`}>
              <div className="post-thumbnail">
                <img src={this.props.thumbnailUrl || this.props.user.imageUrl} />
              </div>
              <div className="post-content">
                <span className="post-title">{this.props.title}</span>
                <span className="post-description">{this.props.insertedAt}</span>
              </div>
            </Link>
          )
        }
        <div className="post-meta">
          <div className="post-action-buttons">
            <a href="#" className="btn" onClick={this.handleLike.bind(this)}>
              <i className="fa fa-caret-up" style={{fontSize: "20px"}}></i>&nbsp;{this.props.likesCount}
            </a>
            <a href="#" className="btn" onClick={this.handleComment.bind(this)}>
              <i className="fa fa-comment-o"></i>&nbsp;{this.props.commentsCount}
            </a>
          </div>
          <div className="post-tags hidden-xs">
            {
              this.props.tags.map(({ name }) => {
                return (
                  <Link to={`/tags/${name}`}
                      key={name}
                      className="btn"
                      onClick={this.handleClickTag.bind(this)}>
                    {name}
                  </Link>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
