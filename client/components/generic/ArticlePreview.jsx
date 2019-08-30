import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import helpers from "../../services/helpers";

import Slideshow from "../UI/Slideshow/Slideshow";

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true
    };
  }

  toggle = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    const article = this.props.article
      ? this.props.article
      : { article_statistics: {} };

    let thumbnail = null;

    if (article.feature_media && article.feature_media.image) {
      thumbnail = helpers.getRenditionUrl(article, "viewImage");
    }

    return (
      <div className="sd-preview-panel">
        <div className="side-panel side-panel--shadow-right">
          <div className="side-panel__header side-panel__header--border-bottom">
            <div className="side-panel__tools">
              <a
                className="icn-btn"
                sd-tooltip="Close"
                flow="top"
                onClick={this.props.close}
              >
                <i className="icon-close-small" />
              </a>
            </div>
            <h3 className="side-panel__heading">Item preview</h3>
          </div>

          <div className="side-panel__content">
            <div
              className={classNames("side-panel-collapsible-header", {
                active: this.state.isExpanded
              })}
            >
              <div className="side-panel-collapsible-header__fixed">
                <p className="sd-text__date-and-author">
                  {article.updated_at ? (
                    <time title={article.updated_at}>
                      {moment(article.updated_at).fromNow()}
                    </time>
                  ) : (
                    <time
                      title={
                        article.published_at
                          ? article.published_at
                          : article.created_at
                      }
                    >
                      {moment(
                        article.published_at
                          ? article.published_at
                          : article.created_at
                      ).fromNow()}
                    </time>
                  )}
                </p>
              </div>
              <div className="side-panel-collapsible-header__collapsible">
                {article.paywall_secured && (
                  <div className="form__row">
                    <span className="label-icon label-icon--warning">
                      <i className="icon-paywall" /> Paywall secured
                    </span>
                  </div>
                )}

                {article.status !== "new" ? (
                  <div className="form__row form__row--small-padding">
                    <div className="flex-grid flex-grid--wrap-items flex-grid--small-2">
                      <div className="flex-grid__item">
                        <label className="form-label form-label--light">
                          Page views
                        </label>
                        <p>{article.article_statistics.page_views_number}</p>
                      </div>
                      <div className="flex-grid__item">
                        <label className="form-label form-label--light">
                          Comments
                        </label>
                        <p>{article.comments_count}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                className={classNames("side-panel-collapsible-header__toggle", {
                  active: this.state.isExpanded
                })}
                onClick={this.toggle}
              >
                <i className="icon-chevron-down-thin" />
              </button>
            </div>

            <div className="side-panel__content-block">
              <h3 className="side-panel__content-block-heading">
                {article.title}
              </h3>
              {thumbnail && (
                <img
                  src={thumbnail}
                  style={{ maxWidth: "100%", marginBottom: "1em" }}
                />
              )}
              <div
                className="side-panel__content-block-text sp-imageMaxWidth-wrapper"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
              {article.slideshows && article.slideshows.length
                ? article.slideshows.map(slideshow => (
                    <Slideshow
                      key={"slideshow" + slideshow.id}
                      items={slideshow.items}
                      tenant={article.tenant}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticlePreview.propTypes = {
  article: PropTypes.object,
  close: PropTypes.func.isRequired
};

export default ArticlePreview;
