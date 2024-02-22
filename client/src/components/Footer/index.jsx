import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {
    user: PropTypes.object,
};

Footer.defaultProps = {
    user: null,
}

function Footer(props) {
    const { user } = props;

    let curYear = new Date().getFullYear();
    return (
        <footer className='my-footer'>
            {user
                ? <p className='copyright-msg'>All right reserved. Copyright ©️ {curYear} by {user.name}.</p>
                : <p className='copyright-msg'>All right reserved. Copyright ©️ THTAn.</p>
            }
        </footer>
    );
}

export default Footer;