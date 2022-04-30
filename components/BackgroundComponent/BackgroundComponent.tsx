// eslint-disable-next-line max-classes-per-file
import { Box } from '@mui/material';
import WalletComponent from 'components/Wallet/WalletComponent';
import { useAuth } from 'myFirebase/AuthContext';
import cloud1 from 'public/cloud1.png';
import cloud2 from 'public/cloud2.png';
import cloud3 from 'public/cloud3.png';
import cloud4 from 'public/cloud4.png';
import cloud5 from 'public/cloud5.png';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const links = [cloud1, cloud2, cloud3, cloud4, cloud5];
const images: HTMLImageElement[] = [];
const alpArr = [0.21, 0.21, 0.21, 0.4, 0.5, 0.6, 0.7, 0.7, 0.7, 0.7,
  0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.5, 0.4, 0.21, 0.21];
const bgArr = [[['#020111', 0.85], ['#191621', 1]],
  [['#020111', 0.6], ['#20202c', 1]],
  [['#020111', 0.1], ['#3a3a52', 1]],
  [['#20202c', 0], ['#515175', 1]],
  [['#40405c', 0], ['#6f71aa', 0.8], ['#8a76ab', 1]],
  [['#4a4969', 0], ['#7072ab', 0.5], ['#cd82a0', 1]],
  [['#757abf', 0], ['#8583be', 0.6], ['#eab0d1', 1]],
  [['#82addb', 0], ['#ebb2b1', 1]],
  [['#94c5f8', 0.01], ['#a6e6ff', 0.7], ['#b1b5ea', 1]],
  [['#b7eaff', 0], ['#94dfff', 1]],
  [['#9be2fe', 0], ['#67d1fb', 1]],
  [['#90dffe', 0], ['#38a3d1', 1]],
  [['#57c1eb', 0], ['#246fa8', 1]],
  [['#2d91c2', 0], ['#1e528e', 1]],
  [['#2473ab', 0], ['#1e528e', 0.7], ['#5b7983', 1]],
  [['#1e528e', 0], ['#265889', 0.5], ['#9da671', 1]],
  [['#1e528e', 0], ['#728a7c', 0.5], ['#e9ce5d', 1]],
  [['#154277', 0], ['#576e71', 0.3], ['#e1c45e', 0.7], ['#b26339', 1]],
  [['#163C52', 0], ['#4F4F47', 0.3], ['#C5752D', 0.6], ['#B7490F', 0.8], ['#2F1107', 1]],
  [['#071B26', 0], ['#071B26', 0.3], ['#8A3B12', 0.8], ['#240E03', 1]],
  [['#010A10', 0.3], ['#59230B', 0.8], ['#2F1107', 1]],
  [['#090401', 0.5], ['#4B1D06', 1]],
  [['#00000c', 0.8], ['#150800', 1]],
  [['#00000c', 0.8], ['#150800', 1]],
];

const getGrad = (date: number, arr: (string | number)[][][]) => {
  let grad = 'to bottom';
  arr[date].forEach((el) => {
    // @ts-ignore
    grad += `, ${el[0]} ${el[1] * 100}%`;
  });
  return grad;
};

let background: any;

let cloudCount = 12;
let speedC = 0.5;
let scaleC = 3;
let pos = 250;
let date = new Date().getHours();
let alp = alpArr[date];
let canvas: any;
let ctx: any;
let doc: HTMLCanvasElement | undefined;

// window dimensions
const dimensions = {
  width: 0,
  height: 0,
};

class Vector2 { // 2-dimensional vector object for movement/position
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2) {
    this.x += vec.x;
    this.y += vec.y;
  }
}

// center of window
const center = new Vector2(0, 0);

class Cloud {
  self: any;
  ready: boolean;
  sprite: HTMLImageElement;
  scale: number;
  width: number;
  height: number;
  alph: number;
  position: Vector2;
  velocity: Vector2;

  constructor() {
    this.self = this;
    this.ready = false;
    this.sprite = images[Math.floor(Math.random() * images.length)];
    // random scale between 1 and 5
    this.scale = Math.round(1 + Math.random() * scaleC);
    // divide width/height by scale
    this.width = this.sprite.width / this.scale;
    this.height = this.sprite.height / this.scale;
    this.alph = alp;
    // position offscreen left, center on y axis, add random y offset between -pos and pos
    this.position = new Vector2(-this.width, center.y - this.height
      / 2 + (Math.round(pos - Math.random() * pos * 2)));
    this.velocity = new Vector2(speedC + Math.random(), 0);
    window.setTimeout(() => {
      this.ready = true;
    }, Math.random() * 12000);
  }

  update() {
    if (this.position.x > dimensions.width) {
      // reset when cloud is offscreen right
      this.sprite = images[Math.floor(Math.random() * images.length)];
      // const scale = Math.round(1 + Math.random() * 6); // random scale between 1 and 5
      this.width = this.sprite.width / this.scale; // divide width/height by scale
      this.height = this.sprite.height / this.scale;
      // position offscreen left, center on y axis, add random y offset between -pos and pos
      this.position = new Vector2(-this.width, center.y - this.height
        / 2 + (Math.round(pos - Math.random() * pos * 2)));
      this.velocity = new Vector2(speedC + Math.random() * 0.5, 0);
      this.alph = alp;
    } else {
      this.position.add(this.velocity); // move cloud across the screen
    }
  }
}

const clouds: Cloud[] = [];

function populate() {
  for (let i = 0; i < cloudCount; i++) {
    clouds.push(new Cloud());
  }
}

function draw() {
  // clear previous frame from offscreen canvas
  ctx.os.clearRect(0, 0, dimensions.width, dimensions.height);
  for (let i = 0; i < cloudCount; i++) {
    const cloud = clouds[i];
    ctx.os.globalAlpha = cloud.alph;
    if (cloud && cloud.ready) {
      ctx.os.globalCompositeOperation = 'difference'; // difference composite adds 'shading' to edges of cloud overlap
      ctx.os.drawImage(cloud.sprite, cloud.position.x, cloud.position.y, cloud.width, cloud.height);
      ctx.os.globalCompositeOperation = 'lighter'; // lighter composite operation brightens areas where the clouds overlap
      ctx.os.drawImage(cloud.sprite, cloud.position.x, cloud.position.y, cloud.width, cloud.height);
      cloud.update();
    }
  }
  ctx.main.fillStyle = background; // fill main canvas with gradient
  ctx.main.fillRect(0, 0, dimensions.width, dimensions.height);
  ctx.main.drawImage(canvas.os, 0, 0); // draw the composited offscreen frame to onscreen canvas
}

function loop() { // image updates in 60 fps
  draw();
  setTimeout(() => loop(), 1000 / 60);
}

function getImages() {
  links.forEach((l) => {
    const img: HTMLImageElement = document.createElement('img');
    img.src = l.src;
    images.push(img);
  });
  populate();
  loop();
}

function resize() {
  // eslint-disable-next-line no-param-reassign,no-multi-assign
  canvas.main.width = canvas.os.width = dimensions.width;
  // eslint-disable-next-line no-param-reassign,no-multi-assign
  canvas.main.height = canvas.os.height = dimensions.height;
  background = ctx.os.createLinearGradient(center.x, 0, center.x, dimensions.height);
  bgArr[date].forEach((el) => {
    background.addColorStop(el[1] as number, el[0] as string);
  });
}

const BackgroundComponent = (props: { children: JSX.Element }) => {
  const [time, setTime] = useState(date);
  const { currentUser } = useAuth()!;
  const { children } = props;
  const canvasTemp = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window) {
      if (isMobile) {
        cloudCount = 4;
        scaleC = 6;
        speedC = 0.5;
        pos = 200;
      }
      dimensions.width = window.innerWidth;
      dimensions.height = window.innerHeight;
      center.x = dimensions.width / 2;
      center.y = dimensions.height / 2;
      if (!doc) {
        doc = document.createElement('canvas');
        doc.style.zIndex = '0';
      }
      canvas = { // get things
        main: canvasTemp.current,
        os: doc,
      };
      ctx = {
        main: canvas.main.getContext('2d'),
        os: canvas.os.getContext('2d'),
      };
      if (!images.length) {
        getImages();
      }
      resize();
    }
    const interval = setInterval(() => {
      const dateTemp = new Date().getHours();
      if (dateTemp !== time) {
        alp = alpArr[dateTemp];
        setTime(dateTemp);
        date = dateTemp;
        resize();
      }
    }, 120000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Box style={{ height: '100%', background: currentUser ? 'green' : 'none', zIndex: '-5' }}>
      <canvas
        ref={canvasTemp}
        id="canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: currentUser ? '45vh' : 0,
          width: currentUser ? '100vw' : 0,
          zIndex: '0',
          background: `linear-gradient(${getGrad(time, bgArr)})`,
        }}
      />
      {children}
      { currentUser && <WalletComponent /> }
    </Box>
  );
};

export default BackgroundComponent;
