import { createCanvas, loadImage } from 'canvas'

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('canvas.png').then((image) => {
  ctx.drawImage(image, 0, 0, 200, 200)
  ctx.fillStyle = 'white'
  ctx.font = "10px Calibri";
  ctx.fillText("My TEXT!", 0, 160);
  ctx.fillText("My TEXT!", 0, 50);

  console.log('<img src="' + canvas.toDataURL() + '" />')
})