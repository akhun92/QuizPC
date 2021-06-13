class menu extends Phaser.Scene 
{
    constructor()
    { //crea la escena/pantalla de juego
        super({key:'menu'});
    }    
    
    preload()
    {
        //cargar los assets (imagenes, sonidos, vídeos) en memoria
        this.load.setPath("data/");
        this.load.json('questions','questions.json'); 
        
        this.load.setPath("assets/sounds/");
        this.load.audio('snd_OK','OK.mp3');
        this.load.audio('snd_KO','KO.mp3');
        this.load.audio('snd_question','question.wav'); 
        this.load.setPath('assets/fonts/'); 
        this.load.bitmapFont('digital', 'ds-digital.png', 'ds-digital.xml');
    }
    
    create()
    {
        this.titulo = this.add.text(gameOptions.ancho/2, 150, 'EUG QUIZ', 
        {fontFamily: 'Arial Black', 
         fill: '#FFFFFF',
         stroke: '#24F3E0',
         strokeThickness: 10,
         fontSize:80
        })
        .setOrigin(0.5);
        
        this.play = this.add.text(gameOptions.ancho/2, 450, 'Presiona el espacio para empezar!', 
        {fontFamily: 'Arial Black', 
         fill: '#FFFFFF',
         stroke: '#24F3E0',
         strokeThickness: 5,
         fontSize:40
        })
        .setOrigin(0.5);
        //.setInteractive();
        

        this.add.tween({targets:this.play,duration:1000,alpha:0,yoyo:true,repeat:-1});
        
        this.espacio = this.input.keyboard.addKey('SPACE').on(
        'down',function()
        {
            gameOptions.questions = this.cache.json.get('questions');
            //console.log(this.data);
            
            gameOptions.thematic = "Grammar";
            
            this.scene.start('level1');
        }
        ,this);
        
    }
    
    update()
    {
        
    }
}