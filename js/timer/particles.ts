// @ts-ignore
import {tsParticles} from "tsParticles";

function confetti(){
  tsParticles.load('tsparticles', {
    backgroundMask: {
      enable: true,
      cover: {
        value: "#222222"
      }
    },
    background: {
      image:
        "linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)",
      size: "100% 100%",
      repeat: "no-repeat"
    },
    fullScreen: {
      enable: true,
      zIndex: 10
    },
    particles: {
      color: {
        value: "#000000",
        animation: {
          enable: true,
          speed: 30
        }
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out"
        },
        size: true,
        speed: {
          min: 1,
          max: 3
        }
      },
      number: {
        value: 500,
        density: {
          enable: true,
          area: 800
        }
      },
      opacity: {
        value: 1,
        animation: {
          enable: false,
          startValue: "max",
          destroy: "min",
          speed: 0.3,
          sync: true
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60
        }
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 60
        }
      },
      shape: {
        type: ["triangle", "circle", "square"]
      },
      size: {
        value: {
          min: 3,
          max: 5
        }
      },
      roll: {
        darken: {
          enable: true,
          value: 30
        },
        enlighten: {
          enable: true,
          value: 30
        },
        enable: true,
        speed: {
          min: 15,
          max: 25
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15
        }
      }
    }
  });
}

function nyanCat(){
  tsParticles.load('tsparticles', {
      "background": {
        "color": {
          "value": "#222222"
        },
        "image": "url('http://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
        "position": "0 110%",
        "repeat": "no-repeat",
        "size": "60%"
      },
      "fullScreen": {
        "enable": true,
        "zIndex": 10
      },
      "particles": {
        "color": {
          "value": "#ffffff"
        },
        "links": {
          "color": {
            "value": "#ffffff"
          },
          "distance": 50,
          "opacity": 0.4
        },
        "move": {
          "attract": {
            "rotate": {
              "x": 600,
              "y": 1200
            }
          },
          "direction": "left",
          "enable": true,
          "path": {},
          "outModes": {
            "bottom": "out",
            "left": "out",
            "right": "out",
            "top": "out"
          },
          "speed": 6,
          "spin": {},
          "straight": true
        },
        "opacity": {
          "value": 0.5,
          "animation": {
            "speed": 1,
            "minimumValue": 0.1
          }
        },
        "shape": {
          "options": {
            "star": {
              "sides": 5
            },
            "polygon": {
              "sides": 5
            }
          },
          "type": "star"
        },
        "size": {
          "random": {
            "enable": true
          },
          "value": {
            "min": 1,
            "max": 4
          },
          "animation": {
            "speed": 40,
            "minimumValue": 0.1
          }
        }
      }
    }
  );
}

function trails(){
  tsParticles.load("tsparticles", {
    "background": {
      "color": {
        "value": "#222222"
      },
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover"
    },
    "fullScreen": {
      "enable": true,
      "zIndex": 10
    },
    "interactivity": {
      "events": {
        "onClick": {
          "mode": "repulse"
        },
        "onHover": {
          "mode": "grab"
        }
      },
      "modes": {
        "bubble": {
          "distance": 400,
          "duration": 2,
          "opacity": 8,
          "size": 40
        },
        "grab": {
          "distance": 200
        }
      }
    },
    "particles": {
      "color": {
        "value": [
          "#5bc0eb",
          "#fde74c",
          "#9bc53d",
          "#e55934",
          "#fa7921"
        ]
      },
      "links": {
        "color": {
          "value": "#ffffff"
        },
        "distance": 150,
        "opacity": 0.4
      },
      "move": {
        "attract": {
          "rotate": {
            "x": 600,
            "y": 1200
          }
        },
        "enable": true,
        "path": {
          "delay": {
            "value": 0.1
          },
          "enable": true
        },
        "outModes": {
          "default": "destroy",
          "bottom": "destroy",
          "left": "destroy",
          "right": "destroy",
          "top": "destroy"
        },
        "speed": 4,
        "trail": {
          "enable": true,
          "length": 20
        }
      },
      "number": {
        "value": 0
      },
      "opacity": {
        "value": 0.5,
        "animation": {
          "speed": 1,
          "minimumValue": 0.1
        }
      },
      "size": {
        "random": {
          "enable": true,
          "minimumValue": 4
        },
        "value": {
          "min": 4,
          "max": 7
        },
        "animation": {
          "speed": 40,
          "minimumValue": 0.1
        }
      }
    },
    "pauseOnBlur": false,
    "emitters": {
      "autoPlay": true,
      "fill": true,
      "life": {
        "wait": false
      },
      "rate": {
        "quantity": 1,
        "delay": 0.1
      },
      "shape": "square",
      "startCount": 0,
      "size": {
        "mode": "precise",
        "height": 50,
        "width": 50
      },
      "position": {
        "x": 50,
        "y": 50
      }
    }
  });
}

function snow(){
  tsParticles.load("tsparticles", {
    "background": {
      "color": {
        "value": "#222222"
      },
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover"
    },
    "fullScreen": {
      "enable": true,
      "zIndex": 10
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onDiv": {
          "elementId": "ring-svg",
          "enable": true,
          "mode": "repulse"
        },
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "repulse": { "distance": 200, "duration": 0.4, "factor": 5 }
      }
    },
    "particles": {
      "links": {
        "color": {
          "value": "#ffffff"
        },
        "distance": 500,
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "attract": {
          "rotate": {
            "x": 600,
            "y": 1200
          }
        },
        "direction": "bottom",
        "enable": true,
        "outModes": {
          "bottom": "out",
          "left": "out",
          "right": "out",
          "top": "out"
        }
      },
      "number": {
        "density": {
          "enable": true
        },
        "value": 400
      },
      "opacity": {
        "random": {
          "enable": true
        },
        "value": {
          "min": 0.1,
          "max": 0.5
        },
        "animation": {
          "speed": 1,
          "minimumValue": 0.1
        }
      },
      "size": {
        "random": {
          "enable": true
        },
        "value": {
          "min": 1,
          "max": 10
        },
        "animation": {
          "speed": 40,
          "minimumValue": 0.1
        }
      },
    }
  });
}

function fireworks(){
  tsParticles.load("tsparticles", {
    fullScreen: {
      enable: true,
      zIndex: 10
    },
    detectRetina: true,
    background: {
      color: "#222222"
    },
    fpsLimit: 60,
    emitters: {
      direction: "top",
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.1
      },
      rate: {
        delay: 0.15,
        quantity: 1
      },
      size: {
        width: 100,
        height: 0
      },
      position: {
        y: 100,
        x: 50
      }
    },
    particles: {
      number: {
        value: 0
      },
      destroy: {
        mode: "split",
        split: {
          count: 1,
          factor: { value: 1 / 3 },
          rate: {
            value: 100
          },
          particles: {
            stroke: {
              color: {
                value: [
                  "#ffffff",
                  "#b22234",
                  "#b22234",
                  "#3c3bfe",
                  "#3c3bfe",
                  "#3c3bfe"
                ]
              },
              width: 1
            },
            number: {
              value: 0
            },
            collisions: {
              enable: false
            },
            opacity: {
              value: 1,
              animation: {
                enable: true,
                speed: 0.7,
                minimumValue: 0.1,
                sync: false,
                startValue: "max",
                destroy: "min"
              }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: 1,
              animation: {
                enable: false
              }
            },
            life: {
              count: 1,
              duration: {
                value: {
                  min: 1,
                  max: 2
                }
              }
            },
            move: {
              enable: true,
              gravity: {
                enable: false
              },
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outMode: "destroy"
            }
          }
        }
      },
      life: {
        count: 1
      },
      shape: {
        type: "line"
      },
      size: {
        value: 50,
        animation: {
          enable: true,
          sync: true,
          speed: 150,
          startValue: "max",
          destroy: "min"
        }
      },
      stroke: {
        color: {
          value: "#ffffff"
        },
        width: 1
      },
      rotate: {
        path: true
      },
      move: {
        enable: true,
        gravity: {
          acceleration: 15,
          enable: true,
          inverse: true,
          maxSpeed: 100
        },
        speed: { min: 10, max: 20 },
        outModes: {
          default: "destroy",
          top: "none"
        },
        trail: {
          fillColor: "#000",
          enable: true,
          length: 10
        }
      }
    }
  });
}

function get_random(list) {
  return list[Math.floor((Math.random()*list.length))];
}
function triggerMeme() {
  let number = Math.floor((Math.random()*1000));
  return number == 0;
}

let particleEffects = [
  'confetti','nyanCat', 'trails', 'snow', 'fireworks'
];
export function random(){
  if (triggerMeme()){
    console.log("rickroll");
  }

  let randomFunction = get_random(particleEffects);
  if (randomFunction === "confetti"){
    confetti();
  }
  if (randomFunction === "nyanCat"){
    nyanCat();
  }
  if (randomFunction === "trails"){
    trails();
  }
  if (randomFunction === "snow"){
    snow();
  }
  if (randomFunction === "fireworks"){
    fireworks();
  }

}
