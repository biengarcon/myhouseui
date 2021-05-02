class SmartHome{
	constructor(name, location) {
		this.__name = name;
		this.__location = location;	
		this.__stuff = ["Лампа","Музыка","Темп"];
	}
	getname(){
		return this.__name;
	}
	getlocation(){
		return this.__location;
	}
	getstuff(){
		return this.__stuff;
	}
	set name(name){
		this.__name=name;
	}
	set location(location){
		this.__location=location;
	}
	static Main() {
		alert("Вас приветствует Умный Дом - " + sm.getname())
		sm.MainMenu();
	}
	MainMenu(){
		alert("Вещи: " + sm.getstuff());
		alert("Функционал: " + sm.getstuff() + ",Выход (Нажать Cancel);" );
		setTimeout( () => {
			let v1=prompt('Выберите с чем взаимодействовать', "Свет");
			if(v1 == "Свет"){
				l.LampMenu();
			}
			else if(v1 == "Музыка"){
				t.Music();
			}
			else if(v1 == "Темп"){
				h.HeaterMenu();
			}
			else if(v1 == "Выход" || v1 == null){
				alert("Закрываеться окно . . . ");
				setTimeout( () => {window.close();},2000);
			}
			else{
				sm.MainMenu();
			}
		},10);
	}
}




class Lamp{
	constructor() {
		this.name = "Свет в доме";
		this.state = false;
		this.brightness = 0; // max 60,
		this.brightlevel = [0,1,2,3]; //0-0,1-20,2-40,3-60
		this.location = "Гостинная";
	}
	getLampName(){
		return this.name;
	}
	getLampState(){
		return this.state;
	}
	getbrightness(){
		return this.brightness;
	}
	getbrightlevel(){
		return this.brightlevel;
	}
	getLampLocation(){
		return this.location;
	}
	setLampName(name){
		this.name=name;
	}
	setLampState(state){
		this.state=state;
	}
	setLampLocation(location){
		this.location=location;
	}
	//поведение
	LampOn(){
		l.setLampState(true);
	}
	LampOff(){
		l.setLampState(false);
	}
	LampInfo(){
		alert("Лампа. Название: "+l.getLampName());
		if(l.getLampState()==true){
			alert("       Состояние: включено");
			alert("Уровень яркости: "+l.getbrightness());
		}
		else{
			alert("       Состояние: выключено");
		}
		alert("Местоположение: "+l.getLampLocation());
		
		let isBoss = false;
		setTimeout( () => {
			do{
				isBoss = confirm("Вернуться?");
			}while(isBoss == false);
			l.LampMenu();
		},10);				
	}
	setbrightness(brightness){
		let re = /^[0-9]+$/g;
		if (re.test(brightness)){
			if(brightness>60 || brightness<0){
				throw new Error(" Яркость не может быть больше 60, или меньше 0.");
			}
			else{
				if(brightness==0 && this.brightness==0){
					alert("Лампа итак выключена!");
					l.LampOff();
				}
				else {
					if(brightness==0){
						alert("Лампа выключена!");
						l.LampOff();
						this.brightness=brightness;
					}
					else if(this.brightness==0 && brightness>0){
						alert("Лампа включена!");
						l.LampOn();
						this.brightness=brightness;
					}
					else{
						l.LampOn();
						this.brightness=brightness;
					}
				}
			}
		}
		else{
			throw new Error(" Введено не натуральное число.");
		}
	}
	Light(){
		setTimeout( () => {
			let v1=prompt('Выберите с чем взаимодействовать', "Установить или выбрать уровень освещения?");
			if(v1 == "Уст"){
				let input=true;
				do{
					try {
						let chi=prompt("Установите яркость лампы, или введите 'Стоп'", 0);
						if(chi == "Стоп" || chi == null){
							input=false;
						}
						else{
							l.setbrightness(chi);
							input=false;//не сработает, пока будет выдаваться ошибка
						}
					}
					catch (error) {
						alert(error);
					}
				}while(input!=false);
				l.Light();
			}
			else if(v1 == "Выб"){
				alert("Уровени яркости: "+l.getbrightlevel()+" (0,20,40,60);");
				setTimeout( () => {
					let input=true;
					do{
						try {
							let lev=prompt("Установите уровень (0,1,2,3), или введите 'Стоп'", 0);
							for (let i = 0; i < l.getbrightlevel().length; i++){
								if(lev==l.getbrightlevel()[i]){
									l.setbrightness(lev*20);
									input=false;
								}
							}
							if(lev == "Стоп" || lev == null){
								input=false;
							}
						}
						catch (error) {
							alert(error);
						}
					}while(input!=false);
					l.Light();
				},10);
			}
			else if(v1 == "Назад" || v1 == null){
				l.LampMenu();
			}
			else{
				l.Light();
			}
		},10);
	}
	LampMenu(){
		setTimeout( () => {
			let v1=prompt('Выберите с чем взаимодействовать', "Лампа. Функционал: Инфо,Вкл,Выкл,Назад;");
			if(v1 == "Инфо"){
				l.LampInfo();
			}
			else if(v1 == "Вкл"){
				l.Light();
			}
			else if(v1 == "Выкл"){
				if(l.getLampState()==false){
					alert("Лампа итак выключена!");
				}
				else{
					l.LampOff();
					alert("Лампа выключена!");
				}
				l.LampMenu();
			}
			else if(v1 == "Назад" || v1 == null){
				sm.MainMenu();
			}
			else{
				l.LampMenu();
			}
		},10);
	}
}

class Temperatura{
	constructor(){
		this.name = "Температура вашей квартиры";
		this.state = false;
		this.temp = 0;
		this.templvl = [1,2,3,4];
		this.location = "Во всей квартире";
	}
	get name(){
		return this.__name;
	}
	get state(){
		return this.__state;
	}
	get temp(){
		return this.__temp;
	}
	get templvl(){
		return this.__templvl;
	}
	get location(){
		return this.__location;
	}
	set templvl(templvl){
		this.__templvl = templvl;
	}
	set temp(temp){
		this.__temp = temp;
	}
	set name(name){
		this.__name = name;
	}
	set state(state){
		this.__state = state;
	}
	set location(location){
		this.__location = location;
	}
	tempInfo(){
		alert("Ваша погода:" + this.name);
	if (state == true ){
		alert ("Состояние : вкл");
		alert ("Температура: " + this.temp);
	}
	else{
		alert ("Состояние : выкл");
	}
	alert ("Уровень нагрева: " + this.templvl);
	alert ("Местоположение: " + this.location);
	let isBoss = false;
				setTimeout( () => {
					do{
						isBoss = confirm("Вернуться?");
					}while(isBoss == false);
					h.HeaterMenu();
				},10);
}
TempOn(){
	this.state=true;
}
TempOff(){
	this.state=false;
}
setTemperature(temperature){
	let re = /^[0-9]+$/g;
	if (re.test(temperature)){
		if(temperature>30 || temperature<0){
			throw new Error(" Температура не может быть больше 30, или меньше 16.");
		}
		else{
			if(temperature==0 && this.temperature==0){
				alert("Обогреватель итак выключен!");
				h.TempOff()
			}
			else {
				if(temperature==0){
					alert("Обогреватель выключен!");
					h.TempOff()
					this.temperature=temperature;
				}
				else if(this.temperature==0 && temperature>0){
					alert("Обогреватель включен!");
					h.TempOn()
					this.temperature=temperature;
				}
				else{
					h.TempOn()
					this.temperature=temperature;
				}
			}
		}
	}
	else{
		throw new Error(" Введено не натуральное число.");
	}
}
Tempfunc(){
	alert(`Тепло:`+ h.temp()
				`Опции:Уст
					  Выб
					  Назад`);
	setTimeout(() => {
		let opt = prompt(`Выберите с чем взаемодействовать:
								Уст
								Выб
								Назад`);
		if(opt=="Уст"){
			let input = true;
			do{
				try{
					let ust = prompt("Установите режим или введите 'Стоп'","summer,1,2,winter");
					if(ust == "Стоп" || ust == null){
						input=false;
					}
					else{
						this.setTemperature(ust);
						input = false;
					}
				}
				catch (error){
					alert(error);
				}				
			}while(input != false);
			h.Tempfunc();
		}
		else if(opt =="Выб"){
			alert("Уровень тепла :"+ this.templvl);
			setTimeout(() => {
				let input = true;
				do{
					try{
						let lev = prompt("Режим тепла(summer(16),1(20),2(22),winter(25)) или введите 'Стоп'",0);
						for (let i=0;i < this.templvl.length; i++){
							if(lev ==this.templvl[i]){
								h.setTemperature(lev+16);
								input=false;
							}
						}
						if(lev == "Стоп" || lev ==null){
							input = false;
						}
					}
					catch (error){
						alert(error);
					}
				}while(input!=false);
				h.Tempfunc();
			},10);
		}
		else if(opt == "Назад" || opt == null){
			h.HeaterMenu();
		}
		else{
			h.Tempfunc();
		}
	},10)
}
HeaterMenu()
{
alert("Температура. Функционал: Инфо,Вкл,Выкл,Назад;" );//Температура
setTimeout( () => {
	let opt=prompt('Выберите с чем взаимодействовать', "Инфо");
	if(opt == "Инфо"){
		h.tempInfo();
	}
	else if(opt == "Вкл"){
		this.Tempfunc();
	}
	else if(opt == "Выкл"){
		if(this.state==false){
			alert("Обогреватель итак выключен!");
		}
		else{
			h.TempOff();
			alert("Обогреватель выключен!");
		}
		h.HeaterMenu();
	}
	else if(opt == "Назад" || opt == null){
		sm.MainMenu();
	}
	else{
		h.HeaterMenu();
	}
},10);
}
}

class Music {
	constructor(song,album){
		this.album = ["Pop","Hip-Hop","Rock","90`s","00s"];
		this.song = ["Lady Gaga","Drake","Gorillaz","2pac","50cent"]
		this.currentSong = 1;
		this.album = album;
		this.song = song;
		this.location = "Гостинная";
		this.volume = 0;
		this.state = "on";
	}
    nextSong(){
        this.currentSong++;
	};
	getState(){
		return this.state;
	}
	setState(state){
		this.state = state;
	}
    previousSong(){
        this.currentSong--;
    };
    setSong(number){
        this.currentSong = number;
	}
	getVolume(){
		return this.__volume;
	}
	setVolume(volume){
		if(volume>=0&&volume<=100)
    {
        this.__volume=volume;
        alert("valid volume");
    } 
      else alert(" not valid volume");
	}
}
	class VideoPlayer extends Music {
		constructor(song,album,volume,video){
			super(song,album,volume)
			this.state = "on";
			this.video = video;
			this.song = song;
		}
		setVideo(song){
			this.video = this.song;
		}
	}

let m = new Music("Hip-Hop","Drake",40)
console.log(m);
m.setSong(3);
console.log(m.currentSong);
m.nextSong();
console.log(m.currentSong);
let v = new VideoPlayer("Hip-Hop","Drake",30)
console.log(v);


var sm = new SmartHome("myHouse","Офис");
var l = new Lamp();
var h = new Temperatura();
var t = new Music()

SmartHome.Main();





// //////////////////////////////////////light,temperatura,alarm,cleaning
