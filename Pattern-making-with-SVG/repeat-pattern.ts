import type { SVGTemplateResult } from "lit";

import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const createElement = (chars: string): SVGTemplateResult => svg`
  <text
    dominant-baseline="hanging"
    font-family="monospace"
    font-size="24px">
    ${chars}
  </text>
`;

@customElement('repeat-pattern')
export class RepeatPattern extends LitElement {    
  @property({type: String}) chars = "lit";
  
  render() {
    return html`
      <svg height="100%" width="100%">
        ${createElement(this.chars)}
      </svg>
    `;
  }
}

const svgCSS = css`
  :host {
    display: block;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  text {
    fill: #ffffff;
    dominant-baseline: hanging;
    font-family: monospace;
    font-size: 24px;
  }
`;

const createElement = (chars: string): SVGTemplateResult => svg`
  <text id="chars">${chars}</text>
`;

const createMotif = (
  numPrints: number,
  offset: number = 0,
): SVGTemplateResult => {
  const rotation = 360 / numPrints;

  const prints = [];
  let currRotation = offset;
  for (let index = 0; index < numPrints; index++) {
    currRotation += rotation;
    prints.push(svg`
      <use
        href="#chars"
        transform="rotate(${currRotation}, 0, 0)">
      </use>
    `);
  }

  return svg`
    <g
      id="motif"
      transform="translate(50, 50)">
        ${prints}
    </g>
  `;
};

const createTileBoundary = () => svg`
  <clipPath id="rect-clip">
    <rect width="200" height="200"></rect>
  </clipPath>
`;

const createTile = () => svg`
  <g clip-path="url(#rect-clip)">
    <use transform="translate(0, 0)" href="#motif"></use>
    <use transform="translate(0, 100)" href="#motif"></use>
    <use transform="translate(100, -50)" href="#motif"></use>
    <use transform="translate(100, 50)" href="#motif"></use>
    <use transform="translate(100, 150)" href="#motif"></use>
  </g>
`;

const createRepeatPattern = () => svg`
  <pattern
    id="repeat-pattern"
    x="-10"
    y="-10"
    width="200"
    height="200"
    patternUnits="userSpaceOnUse">
    ${createTile()}
  </pattern>
`;

@customElement('repeat-pattern')
export class RepeatPattern extends LitElement {
  static styles = [svgCSS, themeCSS];

  @property({type: String}) chars = "lit";
  @property({type: Number, attribute: "num-prints"}) numPrints = 7;
  @property({
    type: Number,
    attribute: "rotation-offset",
  }) rotationOffset = 0;

  render() {
    return html`
      <svg>
        <defs>
          ${createTileBoundary()}
          ${createElement(this.chars)}
          ${createMotif(
            this.numPrints,
            this.rotationOffset,
          )}
          ${createRepeatPattern()}
        </defs>

        <rect class="background" height="100%" width="100%"></rect>
        <rect fill="url(#repeat-pattern)" height="100%" width="100%"></rect>
      </svg>
    `;
  }
}
