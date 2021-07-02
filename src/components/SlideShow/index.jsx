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
        action: "ready"
      },
      {
        id: 3,
        src: "/img/b5bbe5f0ac01033c14a5075e472af8cff45d6696.jpg",
        title: "这才是夏天该有的样子22222222",
        href: "https://www.bilibili.com/read/cv11866588",
        action: "ready"
      },
      {
        id: 4,
        src: "/img/715b6b4ef4828849992b3a616bb8953617ec84b7.jpg",
        title: "当你全身细胞开始说中文22222222",
        href: "https://www.bilibili.com/bangumi/play/ep408287/",
        action: "ready"
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
    clearTimeout(this.timer);
    this.setState({ curIndex: index });
  };

  back = () => {
    clearTimeout(this.timer);
    const { sliders } = this.state;
    const curIndex = (this.curIndex + 3) % 4;

    sliders[curIndex].action = "goRight";
    this.setState({ sliders });

    setTimeout(() => {
      clearTimeout(this.timer);
      sliders[curIndex].action = "backin";
      sliders[(curIndex + 1) % 4].action = "backout";
      this.curIndex = curIndex;
      this.setState({ sliders });
    }, 16);
  };

  render() {
    const { curIndex, sliders } = this.state;
    this.timer = setTimeout(() => {
      this.autoStep();
    }, 2000);
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
          <li>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
          </li>
          <li>&gt;</li>
        </ul>
      </div>
    );
  }
}
