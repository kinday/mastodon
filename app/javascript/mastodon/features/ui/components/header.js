import React from 'react';
import Logo from 'mastodon/components/logo';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { registrationsOpen, me } from 'mastodon/initial_state';
import Avatar from 'mastodon/components/avatar';
import Permalink from 'mastodon/components/permalink';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Account = connect(state => ({
  account: state.getIn(['accounts', me]),
}))(({ account }) => (
  <Permalink href={account.get('url')} to={`/@${account.get('acct')}`}>
    <span style={{ display: 'none' }}>{account.get('acct')}</span>
    <Avatar account={account} size={35} />
  </Permalink>
));

export default class Header extends React.PureComponent {

  static contextTypes = {
    identity: PropTypes.object,
  };

  render () {
    const { signedIn } = this.context.identity;

    let content;

    if (signedIn) {
      content = <Account />;
    } else {
      content = (
        <React.Fragment>
          <a href='/auth/sign_in' className='button'><FormattedMessage id='sign_in_banner.sign_in' defaultMessage='Sign in' /></a>
          <a href={registrationsOpen ? '/auth/sign_up' : 'https://joinmastodon.org/servers'} className='button button-tertiary'><FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' /></a>
        </React.Fragment>
      );
    }

    return (
      <div className='ui__header'>
        <Link to='/' className='ui__header__logo'><Logo /></Link>

        <div className='ui__header__links'>
          {content}
        </div>
      </div>
    );
  }

}
