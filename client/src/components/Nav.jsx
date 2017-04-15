import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { checkCredentials } from '../actions/actions.js';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickEntries = this.onClickEntries.bind(this);
    this.onClickProfile = this.onClickProfile.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onClickHome() {
    this.props.dispatch(push('/'));
  }

  onClickEntries() {
    this.props.dispatch(push('/entries'));
  }

  onClickProfile() {
    this.props.dispatch(push('/signup'));
  }

  onClickLogin() {
    this.props.dispatch(checkCredentials(this.state));
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return(
      <div id="navbar" className="ui inverted menu">
        <a className="item"
           onClick={this.onClickHome}>
          Reflective
        </a>
        <a className="item"
           onClick={this.onClickEntries}>
          Entries
        </a>
        { !this.props.user.id &&
          <div className="right item">
            <div className="ui input">
              <input type="text" placeholder="E-mail"
                onChange={this.onChangeEmail}/>
            </div>
            <div className="ui input">
              <input type="password" placeholder="Password"
                onChange={this.onChangePassword}/>
            </div>
            <div className={ this.props.user.isLoggingIn ? "ui loading primary button" : "ui primary button" }
              onClick={this.onClickLogin}>Login</div>
          </div>
        }
        { this.props.user.id &&
          <div className="right menu">
            <a className="item"
               onClick={this.onClickProfile}>
              Profile
            </a>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav);