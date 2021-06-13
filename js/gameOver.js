class gameOver extends Phaser.Scene 
{
    constructor()
    { //crea la escena/pantalla de juego
        super({key:'gameOver'});
    }    
    
    preload()
    {
        //cargar los assets (imagenes, sonidos, vídeos) en memoria
        this.load.setPath("assets/img/");
        this.load.atlas('flares','flares.png','flares.json');
    }
    
    create()
    {
        
        this.loadFireworks();
        
        this.loadInputManager();
        
        this.pintaScore();
                
    }
    
    loadFireworks()
    {
        this.fireWorks = this.add.particles('flares');
        this.fireWorksEmitter = this.fireWorks.createEmitter({
           frame: [ 'red', 'green','blue','white','yellow'],
        x: gameOptions.ancho/2,
        y: gameOptions.alto+100,
        lifespan: 2000,
        angle: { min: 195, max: 345 },
        speed: { min: 500, max: 700 },
        scale: { start: 0.4, end: 0 },
        gravityY: 400,
        bounce: 0.9,
        //bounds: { x: 250, y: 0, w: 350, h: 0 },
        collideTop: false,
        collideBottom: false,
        blendMode: 'ADD' 
        });
    }
    
    pintaScore()
    {
        this.textStyle = 
        {
         fontFamily: 'Arial Black', 
         fill: '#FFFFFF',
         stroke: '#000000',
         strokeThickness: 10,
         fontSize:80
        }
        this.titulo = this.add.text(gameOptions.ancho/2, 150, 'BEST SCORE', this.textStyle
        )
        .setOrigin(0.5);
        
        this.textActual = this.add.text(gameOptions.ancho/2, 300, 'My actual SCORE WAS: '+localStorage.getItem('actual'),this.textStyle)
        .setOrigin(0.5);
        this.textActual.setFontSize(40);
        
        this.textBest = this.add.text(gameOptions.ancho/2, 350, 'My best SCORE WAS: '+localStorage.getItem('best'),this.textStyle)
        .setOrigin(0.5);
        this.textBest.setFontSize(40);
        
        this.play = this.add.text(gameOptions.ancho/2, 450, 'Press Space to reStart!',this.textStyle)
        .setOrigin(0.5);
        this.play.setFontSize(40);
        //.setInteractive();
        

        this.add.tween({targets:this.play,duration:1000,alpha:0,yoyo:true,repeat:-1});
        
        this.espacio = this.input.keyboard.addKey('SPACE').on(
        'down',function()
        {
            this.scene.start('menu');
        }
        ,this);
    }
    
    loadInputManager()
    {
        this.reset = this.input.keyboard.addKey('R').on(
        'down',function()
        {
            localStorage.setItem('actual',0);
            localStorage.setItem('best',0);
            this.borraScore();
            this.pintaScore();
        }
        ,this);
    }
    
    borraScore()
    {
        this.titulo.destroy();
        
        this.textActual.destroy();
        
        this.textBest.destroy();
        
        this.play.destroy();
        //this.add.tween({targets:this.play,duration:1000,alpha:0,yoyo:true,repeat:-1});
    }
    
    update()
    {
        
    }
}