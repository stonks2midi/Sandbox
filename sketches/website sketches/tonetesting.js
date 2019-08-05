//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();


//c 
synth.triggerAttackRelease('C4', 0.5, 0)
synth.triggerAttackRelease('D4', 0.5, 1)
synth.triggerAttackRelease('E4', 0.5, 2)
synth.triggerAttackRelease('F4', 0.5, 3)
synth.triggerAttackRelease('G4', 0.5, 4)
synth.triggerAttackRelease('A4', 0.5, 5)
synth.triggerAttackRelease('B4', 0.5, 6)
synth.triggerAttackRelease('C4', 0.5, 7)