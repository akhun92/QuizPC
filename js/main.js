var gameOptions =
{
    ancho:960,
    alto:540,
    questions: "",
    thematic:"",
    timeBetweenQuestions:2000,
    questionTime:10
}

var config = 
{
    type: Phaser.AUTO,
    width:gameOptions.ancho,
    height:gameOptions.alto,
    scene:[menu,level1,gameOver],
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

var juego = new Phaser.Game(config);