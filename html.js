import React from 'react';
import DocumentTitle from 'react-document-title';
import BodyClassName from 'react-body-classname';
import Helmet from 'react-helmet';

import {config} from 'config';
import {prefixLink} from 'gatsby-helpers';

module.exports = React.createClass({
  propTypes () {
    return {
      title: React.PropTypes.string
    };
  },
  render () {
    // let title = DocumentTitle.rewind();
    // if (this.props.title) {
    //   title = this.props.title;
    // }

    let head = Helmet.rewind();

    let color = BodyClassName.rewind();
    if (this.props.color) {
      color = this.props.color;
    } else {
      color = 'green';
    }

    let cssLink;
    if (process.env.NODE_ENV === 'production') {
      cssLink = <link rel='stylesheet' href={prefixLink('/styles.css')} />;
    }

    // Sorry, this is gross.
    let analytics = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";';
    analytics += `analytics.load("${config.segment}");`;
    analytics += '}}();';

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8'/>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
          <meta name='viewport' content='width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          { head.meta.toComponent() }
          { head.title.toComponent() }
          <link rel='shortcut icon' href={this.props.favicon}/>
          <script dangerouslySetInnerHTML={{ __html: analytics}} />
          {cssLink}
        </head>
        <body className={color}>
          <div id='react-mount' className='page-wrapper' dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink('/bundle.js')}/>
        </body>
      </html>
    );
  }
});
