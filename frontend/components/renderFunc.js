import { throttle } from '../util/throttle'
export default function AudioVisualizer(canvas) {
  this.minFreq = 200;
  this.maxFreq = 2000;
  this.fftSize = 4096;
  this.minDecibels = -60;
  this.maxDecibels = 0;

  const aud = document.getElementById('audio')
  // this.container = document.getElementById('container')
  // this.canvas = document.createElement('canvas')
  // const aud = aud
  // this.container = container
  // this.canvas = canvas
  this.canvas = canvas;
  this.canvas.width = 800;
  this.canvas.height = 90;
  // this.canvas.width = this.container.clientWidth;
  // this.canvas.height = this.container.clientHeight;
  this.ctx = this.canvas.getContext("2d")
  // this.container.appendChild(this.canvas)

  this.audctx = new (window.AudioContext || window.webkitAudioContext)()
  this.source = this.audctx.createMediaElementSource(aud)
  const splitter = this.audctx.createChannelSplitter(2);
  this.analyzer = [];
  for (let i = 0; i < 2; i++) {
    const _analyzer = this.audctx.createAnalyser();
    _analyzer.fftSize = this.fftSize;
    _analyzer.minDecibels = this.minDecibels;
    _analyzer.maxDecibels = this.maxDecibels;
    splitter.connect(_analyzer, i);
    this.analyzer.push(_analyzer)
  }
  const delay = this.audctx.createDelay(0.26)
  this.source.connect(splitter)
  this.source.connect(delay)
  delay.connect(this.audctx.destination) 

  const bufferLength = this.analyzer[0].frequencyBinCount
  const totalFreqRange = this.analyzer[0].context.sampleRate / 2;
  this.cellFreqPitch = totalFreqRange / (bufferLength - 1)
  this.minIdx = Math.floor(this.minFreq / this.cellFreqPitch)
  this.maxIdx = Math.floor(this.maxFreq / this.cellFreqPitch)
  this.logMinFreq = Math.log(this.minFreq);
  this.logMaxFreq = Math.log(this.maxFreq);
  this.logFreqRange = this.logMaxFreq - this.logMinFreq;

  this.cellXCoord = new Int16Array(this.maxIdx - this.minIdx + 1)
  for (let i = 0; i < this.cellXCoord.length; i++) {
    const logFreqCoord = Math.log(this.minFreq + i * this.cellFreqPitch) - this.logMinFreq
    this.cellXCoord[i] = Math.floor(logFreqCoord / this.logFreqRange * this.canvas.width)
  }

  console.log(this.cellXCoord.length, "cost")
  this.dataArray = new Uint8Array(bufferLength)
  this.ctx.strokeStyle = "lightgrey";
  this.ctx.fillStyle = "lightgrey";

  window.addEventListener('resize', throttle(() => {
    console.log(this)
    this.canvas.width = this.container.clientWidth;
    this.ctx.strokeStyle = "lightgrey";
    this.ctx.fillStyle = "lightgrey";
    this.setCanvas()
  }, 200).bind(this))

}


AudioVisualizer.prototype.setCanvas = function () {
  for (let i = 0; i < this.cellXCoord.length; i++) {
    const logFreqCoord = Math.log(this.minFreq + i * this.cellFreqPitch) - this.logMinFreq
    this.cellXCoord[i] = Math.floor(logFreqCoord / this.logFreqRange * this.canvas.width)
  }
}

AudioVisualizer.prototype.startRenderer = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.beginPath();
  this.ctx.moveTo(0, this.canvas.height / 2);

  this.analyzer[0].getByteFrequencyData(this.dataArray)
  for (var i = this.minIdx; i <= this.maxIdx; i++) {
    const x = this.cellXCoord[i - this.minIdx]
    this.ctx.lineTo(x, this.canvas.height / 2 - this.dataArray[i] / 8);
  }

  this.analyzer[1].getByteFrequencyData(this.dataArray)
  for (var i = this.maxIdx; i >= this.minIdx; i--) {
    const x = this.cellXCoord[i - this.minIdx]
    this.ctx.lineTo(x, this.canvas.height / 2 + this.dataArray[i] / 8 );
  }

  this.ctx.closePath()
  this.ctx.fill()
  this.ctx.stroke()

  // this.ctx.font = "30px Arial";
  // this.ctx.fillText(Date.now(),100,50)

  requestAnimationFrame(this.startRenderer.bind(this));
}