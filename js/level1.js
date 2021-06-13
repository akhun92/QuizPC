class level1 extends Phaser.Scene 
{
    constructor()
    { //crea la escena/pantalla de juego
        super({key:'level1'});
    }    
    
    preload()
    {
        //cargar los assets (imagenes, sonidos, vídeos) en memoria
        this.load.setPath("assets/img/");
        this.load.image('wildcard','50_wildcard.png');
        //console.log(gameOptions.questions);
        //console.log(gameOptions.thematic);
        this.ordenPreguntas=[];
        for(var i in gameOptions.questions.Questions)
        {
           if(gameOptions.questions.Questions[i].Thematic==gameOptions.thematic){
             console.log(gameOptions.questions.Questions[i].Thematic);
               this.load.image("image"+i,gameOptions.questions.Questions[i].image);
               console.log("image"+i);
               this.ordenPreguntas.push(i);
           } 
            //Randomizar el orden de preguntas
            this.ordenPreguntas.sort(() => Math.random() - 0.5)
            console.log(this.ordenPreguntas);
        }
        
        //this.load.spritesheet('slime','slime.png',{frameWidth:32,frameHeight:32});
        //this.load.image('puerta2','spr_door_open_0.png');
    }
    
    create()
    {
        this.preguntaActual = 0;
        
        this.pintaPregunta();
        
        this.pintaPuntuacion();
                        
        this.loadInputManager();
        
        this.pintaComodines();
        
        this.pintaTimer();
        
    }
    
    pintaTimer()
    {
               
       this.reloj =this.add.bitmapText(gameOptions.ancho/2,40,'digital','00:'+gameOptions.questionTime,70).setOrigin(.5).setCenterAlign();
        this.reloj.tiempo = gameOptions.questionTime;
        this.reloj.timer=this.time.addEvent({delay:1000,loop:true,callback:this.actualizaTimer,callbackScope:this});
        
    }
    
    actualizaTimer()
    {
        this.reloj.tiempo--;
        //var minutos = Math.floor(this.reloj.tiempo/60);
        var minutos = 0;
        var segundos = Math.floor(this.reloj.tiempo)- (60*minutos);
        var texto_tiempo = "";
        texto_tiempo +=(minutos<10) ? "0" + minutos : minutos;
        texto_tiempo += (segundos<10) ? ":0" + segundos : ":"+segundos;
        this.reloj.text = texto_tiempo;
        if(this.reloj.tiempo<6){
            console.log(this.reloj);
            //this.reloj.alert= this.add.tween({targets:this.reloj,duration:500,tint:'#FF0000',yoyo:true,repeat:-1});
            this.reloj.setTint(0xFF0000);
        }
        if(this.reloj.tiempo==0){
            this.reloj.timer.destroy();
            this.sound.play('snd_KO');
            for(var i in this.botones)
            {
                if(this.botones[i].text ==gameOptions.questions.Questions[this.ordenPreguntas[0]].Correct)
                {
                    this.botones[i].setColor('green');
                }else{
                    this.botones[i].setColor('red');
                }
            }
            this.siguientePregunta();
        }
    }
    
    pintaComodines()
    {
        this.comodin = this.add.sprite(50,gameOptions.alto/2,'wildcard').setScale(.5).setInteractive({useHandCursor: true});
        
        this.comodin.on('pointerup',function(pointer)
        {
            var respuestasPendientes = 2;
            
            for(var i in this.botones)
                {
                    if(this.botones[i].text !=gameOptions.questions.Questions[this.ordenPreguntas[0]].Correct)
                    {
                        this.botones[i].setColor('red');
                        respuestasPendientes--;
                        if(respuestasPendientes==0)
                        {
                            break;
                        }
                    }
                }    
        },this);
    }
    
    pintaPuntuacion()
    {
        if(this.puntuacionTexto==undefined ||this.puntuacionTexto==null)
        {
            this.myPoints = 0;
        
            this.puntuacionTexto = this.add.text(gameOptions.ancho/2+200, 100, 
            "SCORE: "+this.myPoints,this.preguntaStyle)
            .setOrigin(0.5);
        }else
        {
           this.puntuacionTexto.text = "SCORE: "+this.myPoints; 
        }
    }
    
    pintaPregunta()
    {
        this.sound.play('snd_question');
        this.preguntaStyle = {
         fontFamily: 'Arial Black', 
         fill: '#FFFFFF',
         stroke: '#000000',
         strokeThickness: 10,
         fontSize:20
        };
        
        
        this.imagen = this.add.image(gameOptions.ancho/2,gameOptions.alto/2,'image'+this.ordenPreguntas[0]);

        this.preguntaText = this.add.text(gameOptions.ancho/2, 150, 
            gameOptions.questions.Questions[this.ordenPreguntas[this.preguntaActual]].Question,this.preguntaStyle)        .setOrigin(0.5);

        this.opcionA = this.add.text(gameOptions.ancho/2, 400, 
        gameOptions.questions.Questions[this.ordenPreguntas[this.preguntaActual]].OptionA,this.preguntaStyle)
        .setOrigin(0.5);
        
        
        /*
        this.opcionA.on('pointerover',function(pointer)
        {
            this.opcionA.setStroke('yellow',4);    
        },this);
        
        this.opcionA.on('pointerout',function(pointer)
        {
            this.opcionA.setStroke('black',4);    
        },this);
        */
        this.opcionB = this.add.text(gameOptions.ancho/2, 420, 
        gameOptions.questions.Questions[this.ordenPreguntas[this.preguntaActual]].OptionB,this.preguntaStyle)
        .setOrigin(0.5);
                
        this.opcionC = this.add.text(gameOptions.ancho/2, 440, 
        gameOptions.questions.Questions[this.ordenPreguntas[this.preguntaActual]].OptionC,this.preguntaStyle)
        .setOrigin(0.5);
        
        this.opcionD = this.add.text(gameOptions.ancho/2, 460, 
        gameOptions.questions.Questions[this.ordenPreguntas[this.preguntaActual]].OptionD,this.preguntaStyle)
        .setOrigin(0.5);
        
        this.creaBoton(this.opcionA);
        this.creaBoton(this.opcionB);
        this.creaBoton(this.opcionC);
        this.creaBoton(this.opcionD);
        this.botones = [];
        this.botones.push(this.opcionA);
        this.botones.push(this.opcionB);
        this.botones.push(this.opcionC);
        this.botones.push(this.opcionD);        
    }
    
    creaBoton(_boton)
    {
        _boton.setInteractive({useHandCursor: true});
        _boton.on('pointerover',function(pointer)
        {
            _boton.setStroke('yellow',4);    
        },this);
        
        _boton.on('pointerout',function(pointer)
        {
            _boton.setStroke('black',4);    
        },this);
        
        _boton.on('pointerup',function(pointer)
        {
            if(_boton.text==gameOptions.questions.Questions[this.ordenPreguntas[0]].Correct)
            {
                _boton.setColor('green');
                this.sound.play('snd_OK');
                this.myPoints+=100;
                this.pintaPuntuacion();
            }else
            {
                _boton.setColor('red');
                this.sound.play('snd_KO');
                for(var i in this.botones)
                {
                    if(this.botones[i].text ==gameOptions.questions.Questions[this.ordenPreguntas[0]].Correct)
                    {
                        this.botones[i].setColor('green');
                        break;
                    }
                }
                
            }
            
            this.siguientePregunta();
            
            //Elimina el primer elemento del array
            //this.ordenPreguntas.shift();
            //this.borraPregunta();
            //this.pintaPregunta();
                
        },this);
        
    }
    
    siguientePregunta()
    {
        this.time.addEvent({delay: gameOptions.timeBetweenQuestions, callback: function()
            {
                this.ordenPreguntas.shift();
                this.borraPregunta();
                if(this.ordenPreguntas.length!=0)
                {
                    this.pintaPregunta();
                    this.pintaTimer();
                }else{
                    if (localStorage.getItem('best')==undefined || localStorage.getItem('best')<this.myPoints)
                    {
                    localStorage.setItem('best',this.myPoints);   
                    }
                    localStorage.setItem('actual',this.myPoints);
                    this.scene.start('gameOver');
                }
            }, callbackScope: this, repeat: 0});
    }
    
    borraPregunta()
    {
        this.preguntaText.destroy();
        this.imagen.destroy();
        this.opcionA.destroy();
        this.opcionB.destroy();
        this.opcionC.destroy();
        this.opcionD.destroy();
        this.reloj.timer.destroy();
        this.reloj.destroy();
        
    }
    
    loadInputManager()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey('SPACE');
        /*this.space = this.input.keyboard.addKey('SPACE').on(
        'down',function()
        {
            this.createBullet();
            this.shooting = true;
            this.hero.setFrame(1);                
            this.time.addEvent({delay: 1000, callback: function(){this.shooting=false;}, callbackScope: this, repeat: 0});
        }
        ,this); */
    }
    
    
    
    update()
    {
        
    }
}
    
    
    
    
    
    
    
    
    