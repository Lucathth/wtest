/**
 * SmokeBackground — WebGL2 smoke/noise shader component.
 * Converted from TypeScript to JSX for this project.
 *
 * Original interface bug fixed: was `SmokeBackgroundProps` (undefined),
 * now uses a plain destructured prop with default.
 *
 * Usage:
 *   <SmokeBackground smokeColor="#c8102e" />
 */

import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// GLSL Fragment Shader — FBM smoke with u_color uniform tint
// ---------------------------------------------------------------------------
const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}
void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);
  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);
  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);
  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));
  col=mix(vec3(.06),col,min(time*.1,1.));
  col=clamp(col,.06,1.);
  O=vec4(col,1);
}`;

// ---------------------------------------------------------------------------
// Vertex Shader (minimal pass-through)
// ---------------------------------------------------------------------------
const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

// ---------------------------------------------------------------------------
// WebGL2 Renderer class (TypeScript private fields → plain JS properties)
// ---------------------------------------------------------------------------
class Renderer {
  constructor(canvas, fragmentSource) {
    this.canvas   = canvas;
    this.gl       = canvas.getContext('webgl2');
    this.program  = null;
    this.vs       = null;
    this.fs       = null;
    this.buffer   = null;
    this.color    = [0.5, 0.5, 0.5]; // default gray, overridden via updateColor()
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    this._setup(fragmentSource);
    this._init();
  }

  /** Call whenever the smoke colour should change. */
  updateColor(rgb) {
    this.color = rgb;
  }

  /** Resize canvas to match window DPR — call on window resize.
   *  DPR capped at 1.5: on Retina/3× screens the full resolution gives no
   *  visible improvement for a noise shader but doubles/triples pixel count.
   */
  updateScale() {
    const dpr = Math.min(Math.max(1, window.devicePixelRatio), 1.5);
    this.canvas.width  = window.innerWidth  * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Compile a single shader stage. */
  _compile(shader, source) {
    const { gl } = this;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
    }
  }

  /** Create + link the WebGL program. */
  _setup(fragmentSource) {
    const { gl } = this;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!this.vs || !this.fs || !program) return;

    this._compile(this.vs, VERTEX_SHADER);
    this._compile(this.fs, fragmentSource);

    this.program = program;
    gl.attachShader(program, this.vs);
    gl.attachShader(program, this.fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(program));
    }
  }

  /** Upload geometry and cache uniform locations. */
  _init() {
    const { gl, program } = this;
    if (!program) return;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations directly on the program object for convenience
    program._uResolution = gl.getUniformLocation(program, 'resolution');
    program._uTime       = gl.getUniformLocation(program, 'time');
    program._uColor      = gl.getUniformLocation(program, 'u_color');
  }

  /** Draw one frame. `now` is DOMHighResTimeStamp (ms). */
  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl.isProgram(program)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.uniform2f(program._uResolution, canvas.width, canvas.height);
    gl.uniform1f(program._uTime, now * 1e-3);
    gl.uniform3fv(program._uColor, this.color);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /** Tear down GPU resources. */
  reset() {
    const { gl, program, vs, fs } = this;
    if (!program) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------
const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : null;
};

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------
/**
 * @param {{ smokeColor?: string }} props
 *   smokeColor — hex colour that tints the smoke highlights, default: '#c8102e'
 */
export function SmokeBackground({ smokeColor = '#c8102e' }) {
  const canvasRef   = useRef(null);
  const rendererRef = useRef(null);

  // Initialise renderer + animation loop once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer(canvas, FRAGMENT_SHADER);
    rendererRef.current = renderer;

    // Debounce resize: the shader only needs to update once the user
    // finishes resizing, not on every pixel of drag.
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => renderer.updateScale(), 120);
    };
    renderer.updateScale(); // set initial size immediately
    window.addEventListener('resize', onResize, { passive: true });

    let raf;
    const loop = (now) => {
      renderer.render(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      renderer.reset();
    };
  }, []);

  // Update colour whenever prop changes (no re-mount needed)
  useEffect(() => {
    const rgb = hexToRgb(smokeColor);
    if (rgb && rendererRef.current) rendererRef.current.updateColor(rgb);
  }, [smokeColor]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
