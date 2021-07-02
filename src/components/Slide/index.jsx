import React, { Component } from "react";

export default class Slide extends Component {
  actions = {
    forwardin: {
      transition: "all 0.55s ease",
      transform: "translate3d(0px, 0px, 0px)"
    },
    forwardout: {
      transition: "all 0.25s ease",
      transform: "translate3d(-550px, 0px, 0px)"
    },
    ready: {
      transition: "none 0.55s ease",
      transform: "translate3d(550px, 0px, 0px)"
    },
    backout: {
      transition: "all 0.25s ease",
      transform: "translate3d(550px, 0px, 0px)"
    },
    backin: {
      transition: "all 0.55s ease",
      transform: "translate3d(0px, 0px, 0px)"
    },
    goLeft: {
      transition: "none 0.55s ease",
      transform: "translate3d(550px, 0px, 0px)"
    },
    goRight: {
      transition: "none 0.55s ease",
      transform: "translate3d(-550px, 0px, 0px)"
    }
  };

  render() {
    const { src, title, href, action } = this.props;
    return (
      <div className="slide-item" style={this.actions[action]}>
        <a href={href} target="_blank" rel="noreferrer">
          <img src={src} alt={title} />
          <p className="slide-title">{title}</p>
        </a>
      </div>
    );
  }
}
