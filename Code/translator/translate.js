var code = "";
var sentence = "";
var charCodes=new Array(36);
charCodes["a"]=". _";
charCodes["b"]="_ . . .";
charCodes["c"]="_ . _ .";
charCodes["d"]="_ . .";
charCodes["e"]=".";
charCodes["f"]=". . _ .";
charCodes["g"]="_ _ .";
charCodes["h"]=". . . .";
charCodes["i"]=". .";
charCodes["j"]=". _ _ _";
charCodes["k"]="_ . _";
charCodes["l"]=". _ . .";
charCodes["m"]="_ _";
charCodes["n"]="_ .";
charCodes["o"]="_ _ _";
charCodes["p"]=". _ _ .";
charCodes["q"]="_ _ . _";
charCodes["r"]=". _ .";
charCodes["s"]=". . .";
charCodes["t"]="_";
charCodes["u"]=". . _";
charCodes["v"]=". . . _";
charCodes["w"]=". _ _";
charCodes["x"]="_ . . _";
charCodes["y"]="_ . _ _";
charCodes["z"]="_ _ . .";
charCodes["1"]=". _ _ _ _";
charCodes["2"]=". . _ _ _";
charCodes["3"]=". . . _ _";
charCodes["4"]=". . . . _";
charCodes["5"]=". . . . .";
charCodes["6"]="_ . . . .";
charCodes["7"]="_ _ . . .";
charCodes["8"]="_ _ _ . .";
charCodes["9"]="_ _ _ _ .";
charCodes["0"]="_ _ _ _ _";

function l2c(){
    sentence = document.getElementById("l").value;
    code = sentence;
    trans(sentence);
    document.getElementById("code").innerHTML = trans(sentence);
}

function trans(letter)
{
    code = "";
    for(var i = 0; i < letter.length; i++)
    {
        var lt = letter.charAt(i);
        if(lt == " ")
        {code = code + "\xa0"+"\xa0" + "\xa0" + "\xa0";}
        else
        {code = code + charCodes[lt]+"\xa0" + "\xa0" + "\xa0";}
    }
    return code;
}



function c2a()
{
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.beep = new AudioContext();
    this.oscillator = this.beep.createOscillator();
    this.gain = this.beep.createGain();
    this.time = this.beep.currentTime;

    this.gain.gain.value = 0;
    this.oscillator.frequency.value = 750;
    this.oscillator.connect(gain);
    this.gain.connect(this.beep.destination);
    this.oscillator.start(0);


    var dur = 0.07;

    //this.gain.gain.setValueAtTime(1.0, time);
    //this.gain.gain.setValueAtTime(0, time + 0.5);


    for(var i = 0; i < code.length; i++)
    {
        var c = code.charAt(i);
        if(c == ".")
        {
            gbeep(dur, time);
            this.time += dur;

        }
        if(c == "_")
        {
            gbeep(dur*3, time);
            this.time += 3*dur;
        }
        if(c == "\xa0")
        {
            this.time += dur;

        }
        else if(c == " ")
        {
            this.time += dur;

        }
    }
}

function gbeep(Dur,time)
{

    this.gain.gain.setValueAtTime(1.0, time);
    this.gain.gain.setValueAtTime(0, time + Dur);



}

