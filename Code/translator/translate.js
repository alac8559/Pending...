var code = "";
var sentence = "";
var charCodes=new Array(36);
charCodes["A"]=". _";
charCodes["B"]="_ . . .";
charCodes["C"]="_ . _ .";
charCodes["D"]="_ . .";
charCodes["E"]=".";
charCodes["F"]=". . _ .";
charCodes["G"]="_ _ .";
charCodes["H"]=". . . .";
charCodes["I"]=". .";
charCodes["J"]=". _ _ _";
charCodes["K"]="_ . _";
charCodes["L"]=". _ . .";
charCodes["M"]="_ _";
charCodes["N"]="_ .";
charCodes["O"]="_ _ _";
charCodes["P"]=". _ _ .";
charCodes["Q"]="_ _ . _";
charCodes["R"]=". _ .";
charCodes["S"]=". . .";
charCodes["T"]="_";
charCodes["U"]=". . _";
charCodes["V"]=". . . _";
charCodes["W"]=". _ _";
charCodes["X"]="_ . . _";
charCodes["Y"]="_ . _ _";
charCodes["Z"]="_ _ . .";
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


    this.sentence = document.getElementById("l").value;

    for(var i = 0; i < this.sentence.length; i++)
    {
        var lt = this.sentence.charAt(i);

        if(!lt.match(/[a-zA-Z0-9]/))
        {
            if(lt != " ")
            {
                alert("Please only enter letters and numbers.");
                return;
            }
        }

    }


    filter(this.sentence);

    code = sentence;
    trans(sentence);
    document.getElementById("code").innerHTML = trans(sentence);
}



function filter(sent)
{

    this.sentence = this.sentence.toUpperCase();

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



function CreateAudioContext(freq)
{

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.beep = new AudioContext();
    this.oscillator = this.beep.createOscillator();
    this.gain = this.beep.createGain();
    this.time = this.beep.currentTime;
    this.gain.gain.value = 0;
    this.oscillator.frequency.value = freq;
    this.oscillator.connect(gain);
    this.gain.connect(this.beep.destination);
    this.oscillator.start(0);

}

function c2a()
{

    CreateAudioContext(750);
    var dur = 0.07;

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

