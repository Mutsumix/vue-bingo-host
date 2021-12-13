(function() {
    'use strict';

    var slotTimer;
    var drumRoll = document.getElementById('audio_drum');
    var cymbal = document.getElementById('audio_cymbal');
    var bingoNumArray = Array.from(new Array(75)).map((v, i) => i+1)
    var bingoNumer = "0";
    var setNum = "0";


    var vm = new Vue({
        el: '#app',
        data: {
			items:
				['01','16','31','46','61',
				'02','17','32','47','62',
				'03','18','33','48','63',
				'04','19','34','49','64',
				'05','20','35','50','65',
				'06','21','36','51','66',
				'07','22','37','52','67',
				'08','23','38','53','68',
				'09','24','39','54','69',
				'10','25','40','55','70',
				'11','26','41','56','71',
				'12','27','42','57','72',
				'13','28','43','58','73',
				'14','29','44','59','74',
				'15','30','45','60','75',],
            panel1:"0",
            panel10:"0",
            spinButton:false,
            stopButton: true,
            pStyle:"",
            bingoId:"0"
        },
        methods: {
            runSlot: function () {

                drumRoll.play();
                cymbal.pause();
                this.spinButton = true;
                this.stopButton = false;

                var bingoNum = bingoNumArray.length;
                if (bingoNum==0){
                    return;
                }

                bingoNumer = Math.floor(Math.random() * bingoNum).toString();
                setNum = bingoNumArray[bingoNumer];
                if (parseInt(setNum) < 10){
                    setNum = '0' + setNum;
                }
                setNum = setNum.toString();

                this.panel1 = setNum.substr(0, 1);
                this.panel10 = setNum.substr(1, 2); 

                slotTimer = setTimeout(this.runSlot, 25);

            },

            runStop: function () {
                clearInterval(slotTimer);
                cymbal.play();
                drumRoll.pause();
                this.spinButton = false;
                this.stopButton = true;
                cymbal.currentTime = 0;
                drumRoll.currentTime = 0;

                bingoNumArray.splice(parseInt(bingoNumer),1);
                var id = setNum;

                $('#' + id).addClass("unmatched");
            }

        },
        directives: {
            disable: function (el, binding) {
                el.disabled = binding.value
            }
        }
    });

    $("body").keypress(function (event) {
        if (event.which === 13) {
            console.log("ENTER");
            $('#spinButton').click();
            $('#stopButton').click();
        }
    });

})();