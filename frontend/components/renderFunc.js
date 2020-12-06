import { throttle } from '../util/throttle'
export default function renderFunc() {
  this.minFreq = 200;
  const maxFreq = 2000;
  const fftSize = 4096;
  const minDecibels = -60;
  const maxDecibels = 0;


  const aud = document.getElementById('audio')
  const container = document.getElementById('container')
  this.canvas = document.createElement('canvas')
  this.canvas.width = container.clientWidth;
  this.canvas.height = container.clientHeight;
  this.ctx = canvas.getContext("2d")
  container.appendChild(canvas)

  const audctx = new (window.AudioContext || window.webkitAudioContext)()
  const source = audctx.createMediaElementSource(aud)
  const splitter = audctx.createChannelSplitter(2);
  this.analyzer = [];
  for (let i = 0; i < 2; i++) {
    const _analyzer = audctx.createAnalyser();
    _analyzer.fftSize = fftSize;
    _analyzer.minDecibels = minDecibels;
    _analyzer.maxDecibels = maxDecibels;
    splitter.connect(_analyzer, i);
    this.analyzer.push(_analyzer)
  }
  const delay = audctx.createDelay(0.26)
  source.connect(splitter)
  source.connect(delay)
  delay.connect(audctx.destination)

  const bufferLength = this.analyzer[0].frequencyBinCount
  const totalFreqRange = this.analyzer[0].context.sampleRate / 2;
  this.cellFreqPitch = totalFreqRange / (bufferLength - 1)
  this.minIdx = Math.floor(minFreq / this.cellFreqPitch)
  this.maxIdx = Math.floor(maxFreq / this.cellFreqPitch)
  this.logMinFreq = Math.log(minFreq);
  this.logMaxFreq = Math.log(maxFreq);
  this.logFreqRange = this.logMaxFreq - this.logMinFreq;

  this.cellXCoord = new Int16Array(maxIdx - minIdx + 1)
  for (let i = 0; i < cellXCoord.length; i++) {
    const logFreqCoord = Math.log(minFreq + i * cellFreqPitch) - logMinFreq
    this.cellXCoord[i] = Math.floor(logFreqCoord / this.logFreqRange * canvas.width)
  }

  console.log(cellXCoord.length, "cost")
  let dataArray = new Uint8Array(bufferLength)
  // ctx.strokeStyle = "#ad0f37";
  ctx.strokeStyle = "lightgrey";
  ctx.fillStyle = "lightgrey";
  // ctx.beginPath();
  // ctx.moveTo(0,0);
  // ctx.lineTo(canvas.width, canvas.height);
  // ctx.stroke()
  const something = "asdf"
  console.log(this, 'isitdef')
  function onResize() {
    console.log(canvas.width, 'asdfasdf?????')
    throttle(() => {
      console.log(container.clientWidth, 'qwerqwer')
      canvas.width = container.clientWidth;
    }, 500)()
  }
  window.addEventListener('resize', onResize.bind("anything?"))
}

renderFunc.setCanvas = function () {
  for (let i = 0; i < this.cellXCoord.length; i++) {
    const logFreqCoord = Math.log(this.minFreq + i * this.cellFreqPitch) - this.logMinFreq
    this.cellXCoord[i] = Math.floor(logFreqCoord / this.logFreqRange * this.canvas.width)
  }
}

renderFunc.prototype.startRenderer = function () {
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
    this.ctx.lineTo(x, this.canvas.height / 2 + this.dataArray[i] / 8);
  }

  this.ctx.closePath()
  this.ctx.fill()
  this.ctx.stroke()
  this.ctx.font = "30px Arial";
  this.ctx.fillText(this.canvas.width, 100, 50);
  requestAnimationFrame(this.startRenderer);
}