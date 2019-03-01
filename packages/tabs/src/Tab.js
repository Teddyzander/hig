import React from "react";
import PropTypes from "prop-types";
import { ControlBehavior } from "@hig/behaviors";
import TabPresenter from "./presenters/TabPresenter";

/**
 * @typedef {Object} RenderTabPayload
 * @property {string} key
 * @property {boolean} [active]
 * @property {string} [label]
 * @property {Function} [handleClick]
 * @property {Function} [handleKeyDown]
 */

/**
 * @typedef {Object} TabProps
 * @property {boolean} [active]
 * @property {string} [children]
 * @property {string} [label]
 * @property {Function} [onClick]
 * @property {string} render A render prop allowing for custom tab components to be rendered
 */

/**
 * This component is a facade for interfacing with the `Tabs` component.
 * The logic within the `Tabs` component is strictly separated from the `TabPresenter`.
 *
 * @param {TabProps} props
 * @returns {null}
 */
export default function Tab() {
  return null;
}

Tab.defaultProps = {
  /**
   * @param {RenderTabPayload} props
   * @returns {JSX.Element}
   */
  /* eslint-disable react/prop-types */
  render({ handleClick, handleKeyDown, label, ...otherProps }) {
    return (
      <ControlBehavior key={label}>
        {({
          hasFocus,
          hasHover,
          onBlur,
          onFocus,
          onMouseEnter,
          onMouseLeave
        }) => (
          <TabPresenter
            hasFocus={hasFocus}
            hasHover={hasHover}
            label={label}
            onBlur={onBlur}
            onFocus={onFocus}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...otherProps}
          />
        )}
      </ControlBehavior>
    );
  }
  /* eslint-disable react/prop-types */
};

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  render: PropTypes.func.isRequired
};
