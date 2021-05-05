import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/staff/dashboard/markets">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/staff/dashboard/markets">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
