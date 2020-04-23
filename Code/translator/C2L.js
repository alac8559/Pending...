function createOscilator()
{
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.tbeep = new AudioContext();
    this.oscillator = this.tbeep.createOscillator();
    this.gain = this.tbeep.createGain();
    this.time = this.tbeep.currentTime;
    this.gain.gain.value = 0;
    this.oscillator.frequency.value = 750;
    this.oscillator.connect(gain);
    this.gain.connect(this.tbeep.destination);
    this.oscillator.start(0);
}

function send()
{
    this.down = -1;
    this.dur = -1;
    this.up = -1;
    this.unit = 0.1;
    this.t_code = "";

}

function Down()
{
    createOscilator();
    if(this.down != -1)
    {   
        this.down = Date.now();
        this.dur = this.down - this.up;
        interpret_s();
    }
    
    this.down = Date.now();
    this.gain.gain.setValueAtTime(1.0, this.tbeep.currentTime);
}

function Up()
{
    this.up = Date.now();
    this.dur = this.up - this.down;
    interpret_b();
    this.gain.gain.setValueAtTime(0, this.tbeep.currentTime);
}

function interpret_s()
{   
    this.t_code += "\xa0"

    if(this.dur/1000 >  3 * this.unit)
    {
        this.t_code +="\xa0" + "\xa0";

    }

    if(this.dur/1000 >=  7 * this.unit)
    {
        this.t_code += "\xa0" + "\xa0" + "\xa0" + "\xa0";
    }
    

}

function tc_update()
{
    document.getElementById("tut_code").innerHTML = this.t_code;
}

function interpret_b()
{   
    if(this.dur/1000 >=  3*this.unit)
    {
        this.t_code +="_";
    }

    else
    {
        this.t_code += ".";
    }
    
    
    tc_update() ;

}

function tc_translate()
{

}