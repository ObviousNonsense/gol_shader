// in this sketch we're going to send the current frame and one past frame to the shader
// we will subtract one frame from the other to find the difference between the frames
// frame differencing can be useful  when you want to detect if something is moving in front of the camera, or as a stepping stone to something like determining optical flow

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
    noStroke();

    // the pastFrame layer doesn't need to be WEBGL
    pastFrame = createGraphics(width, height);
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
}