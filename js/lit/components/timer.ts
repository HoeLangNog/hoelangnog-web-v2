// @ts-ignore
import {customElement, property} from "lit/decorators";
// @ts-ignore
import {LitElement, css, html} from "lit";

@customElement("hln-timer")
export class TimerElement extends LitElement {

  constructor() {
    super();
  }

  static styles = css`
    h2 {
      font-family: 'Source Sans Pro ', sans-serif;
      color: white;
      position: relative;
      z-index: 2;
      width: 100%;
      text-align: center;
      font-size: 65px;
      transition: color 200ms linear;
      top: -60px;
    }
    .progress-ring {
      position: absolute;
      z-index: 0;
      top: calc(50% - 155px);
      left: calc(50% - 155px);
    }
    .progress-ring__circle {
      color: green;
      transition: 0.35s stroke-dashoffset;
      /*// axis compensation*/
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    #line-svg {
      mask: url("#circle-svg");
    }

    .ring-position {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  `

  @property()
  time?: string = '00:00:00';

  @property()
  progress?: number = 100;

  render() {

    let radius = 150;
    let circumference = radius * 2 * Math.PI;

    const offset = circumference - this.progress / 100 * circumference;
    return html`
      <h2 id="timer-text" class="fadein">${this.time}</h2>

      <svg
        class="progress-ring fadein"
        id="ring-svg"
        width="308"
        height="308">
        <mask id="mask">
          <circle
            class="ring-position"
            stroke="#ffffff"
            stroke-width="4"
            fill="transparent"
            r="150"
            cx="155"
            cy="155"/>
        </mask>
        <circle
          id="circle"
          class="progress-ring__circle"
          style="stroke-dashoffset: ${offset};"
          stroke="#ffa200"
          stroke-width="4"
          fill="transparent"
          r="150"
          cx="155"
          cy="155"/>
        <g mask="url(#mask)" class="time-lines" stroke="red" stroke-linecap="square"></g>
    `
  }

}
