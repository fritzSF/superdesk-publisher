import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import helpers from "../../../services/helpers.js";

const ArticleItem = ({
  item,
  openPreview,
  previewItem,
  index,
  showExtras = false,
  remove,
  pinUnpin,
  willBeTrimmed,
}) => {
  let thumbnail = null;

  if (item.feature_media && item.feature_media.renditions) {
    thumbnail = helpers.getRenditionUrl(item.feature_media.renditions);
  }

  return (
    <div
      className={classNames("sd-list-item", {
        "sd-list-item--activated": previewItem && previewItem.id === item.id,
      })}
      style={willBeTrimmed ? { opacity: 0.5 } : {}}
      onClick={() => openPreview(item)}
    >
      {showExtras && item.isDuplicate && (
        <div className="sd-list-item__column" style={{ overflow: "visible" }}>
          <a
            className="btn btn--alert btn--small btn--icon-only btn--hollow"
            sd-tooltip="Duplicate"
          >
            <i className="icon-warning-sign" />
          </a>
        </div>
      )}
      {showExtras && !item.isDuplicate && (
        <div className="sd-list-item__column">
          <span className="sd-list-item__serial-number sp-listSerialNumberMinWidth">
            {index + 1}
          </span>
        </div>
      )}

      {thumbnail && (
        <div
          className="sd-list-item__column sd-list-item__column--no-border sd-list-item__column--no-right-padding"
          style={{ width: "60px" }}
        >
          <img
            src={thumbnail}
            className="sd-list-item__thumbnail"
            style={{ maxWidth: "60px" }}
          />
        </div>
      )}

      <div className="sd-list-item__column sd-list-item__column--grow">
        <div className="sd-list-item__row">
          <span className="sd-overflow-ellipsis sd-list-item__text-strong">
            {item.title}
          </span>
        </div>
        <div className="sd-list-item__row">
          <span className="sd-overflow-ellipsis sd-list-item--element-grow">
            {moment(item.published_at).fromNow()}
          </span>
          <span className="label label--success label--hollow">
            {item.route && item.route.name}
          </span>
          {item.sticky && (
            <span className="pull-right label label--primary label--hollow">
              pinned
            </span>
          )}
        </div>
      </div>
      {showExtras && (
        <div className="sd-list-item__action-menu sd-list-item__action-menu--direction-row">
          <button
            className="pull-right"
            onClick={(e) => {
              e.stopPropagation();
              pinUnpin(item.id);
            }}
            title={item.sticky ? "Unpin" : "Pin"}
            sd-tooltip={item.sticky ? "Unpin" : "Pin"}
            flow="left"
          >
            <i className="icon-pin" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              remove(item.id);
            }}
            sd-tooltip="Remove"
            flow="left"
          >
            <i className="icon-trash" />
          </button>
        </div>
      )}
    </div>
  );
};

ArticleItem.propTypes = {
  item: PropTypes.object.isRequired,
  openPreview: PropTypes.func.isRequired,
  previewItem: PropTypes.object,
  index: PropTypes.number,
  showExtras: PropTypes.bool,
  remove: PropTypes.func,
  pinUnpin: PropTypes.func,
  willBeTrimmed: PropTypes.bool,
};

export default ArticleItem;
