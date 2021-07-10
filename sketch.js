// Sources:
// https://discourse.processing.org/t/backbuffer-in-p5js/29769/6
// https://www.shadertoy.com/view/ld3Sz7
// https://github.com/aferriss/p5jsShaderExamples
// https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shadertoy

// the shader variable
let theShader;
let canvas;
let pastFrame;

function preload() {
    // load the shader
    theShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
    // shaders require WEBGL mode to work
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1)
    noStroke();

    // the pastFrame layer doesn't need to be WEBGL
    pastFrame = createGraphics(width, height);
    pastFrame.pixelDensity(1);
}

function draw() {
    // shader() sets the active shader with our shader
    shader(theShader);

    theShader.setUniform('u_pastFrame', pastFrame);
    theShader.setUniform('u_resolution', [width, height]);
    theShader.setUniform('u_frame', frameCount)
    theShader.setUniform('u_time', millis() * 1000)
    theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
    theShader.setUniform("u_mousePressed", mouseIsPressed);

    // rect gives us some geometry on the screen
    // scale(5)
    rect(0, 0, width, height);

    pastFrame.clear();
    pastFrame.image(canvas, 0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pastFrame.resizeCanvas(width, height);
    frameCount = 0;
}