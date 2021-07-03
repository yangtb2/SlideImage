import React, { Component } from "react";
import Slide from "../Slide";

export default class SlideShow extends Component {
  state = {
    sliders: [
      {
        id: 1,
        src: "/img/b5bbe5f0ac01033c14a5075e472af8cff45d6696.jpg",
        title: "这才是夏天该有的样子1111111",
        href: "https://www.bilibili.com/read/cv11866588",
        action: "forwardin"
      },
      {
        id: 2,
        src: "/img/715b6b4ef4828849992b3a616bb8953617ec84b7.jpg",
        title: "当你全身细胞开始说中文11111111",
        href: "https://www.bilibili.com/bangumi/play/ep408287/",
        action: "goRight"
      },
      {
        id: 3,
        src: "/img/b5bbe5f0ac01033c14a5075e472af8cff45d6696.jpg",
        title: "这才是夏天该有的样子22222222",
        href: "https://www.bilibili.com/read/cv11866588",
        action: "goRight"
      },
      {
        id: 4,
        src: "/img/715b6b4ef4828849992b3a616bb8953617ec84b7.jpg",
        title: "当你全身细胞开始说中文22222222",
        href: "https://www.bilibili.com/bangumi/play/ep408287/",
        action: "goRight"
      }
    ]
  };

  curIndex = 0;

  autoStep = () => {
    const curIndex = (this.curIndex + 1) % 4;
    const { sliders } = this.state;
    sliders.forEach((slider, index) => {
      const action =
        curIndex === index
          ? "forwardin"
          : (index + 1) % 4 === curIndex
          ? "forwardout"
          : "ready";
      slider.action = action;
    });
    this.curIndex = curIndex;
    this.setState({ sliders });
  };

  goto = index => {
    if (index === this.curIndex) return;
    clearTimeout(this.timer);
    const { sliders } = this.state;
    const backward = index < this.curIndex;
    sliders[index].action = backward ? "goLeft" : "goRight";
    this.setState({ sliders });

    setTimeout(() => {
      clearTimeout(this.timer);
      sliders[this.curIndex].action = backward ? "backout" : "forwardout";
      sliders[index].action = backward ? "backin" : "forwardin";
      this.curIndex = index;
      this.setState(sliders);
    }, 16);
  };

  back = () => {
    clearTimeout(this.timer);
    const { sliders } = this.state;
    const curIndex = (this.curIndex + 3) % 4;

    sliders[curIndex].action = "goLeft";
    this.setState({ sliders });

    setTimeout(() => {
      clearTimeout(this.timer);
      sliders[curIndex].action = "backin";
      sliders[(curIndex + 1) % 4].action = "backout";
      this.curIndex = curIndex;
      this.setState({ sliders });
    }, 16);
  };

  forward = () => {
    clearTimeout(this.timer);
    const { sliders } = this.state;
    const curIndex = (this.curIndex + 1) % 4;

    sliders[curIndex].action = "goRight";
    this.setState({ sliders });

    setTimeout(() => {
      clearTimeout(this.timer);
      sliders[curIndex].action = "forwardin";
      sliders[(curIndex + 3) % 4].action = "forwardout";
      this.curIndex = curIndex;
      this.setState({ sliders });
    }, 16);
  };

  componentDidUpdate() {
    this.timer = setTimeout(() => {
      this.autoStep();
    }, 2000);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.autoStep();
    }, 2000);
  }

  render() {
    const { sliders } = this.state;
    return (
      <div className="slide-container">
        {sliders.map(slider => {
          const { id, src, title, href, action } = slider;
          return (
            <Slide
              key={id}
              src={src}
              title={title}
              href={href}
              action={action}
            />
          );
        })}
        <ul className="slide-trigger">
          <li onClick={this.back}>&lt;</li>
          {sliders.map((slide, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  this.goto(index);
                }}
              >
                {index + 1}
              </li>
            );
          })}
          <li onClick={this.forward}>&gt;</li>
        </ul>
      </div>
    );
  }
}
