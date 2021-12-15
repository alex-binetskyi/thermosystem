/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var LIST = document.querySelector('#LIST'),
                text = document.querySelectorAll('.text input2');

        function option()
        {
            let disd = false;
            switch (LIST.value)
            {
                case 'off':
                    var billingItems = document.querySelectorAll('#mthe input[type="text"]');
                    
                     for (var i = 0; i < 4; i++)
                     {
                     //billingItems[i].value = "";
                     billingItems[i].disabled =true;
                     }
			
                     document.getElementById('snmp_pass').disabled = false;
                    document.getElementById('submitbutton2').disabled = false;
                    break;

                case 'SNMP':
                    var billingItems = document.querySelectorAll('#mthe input[type="text"]');
                    for (var i = 0; i < billingItems.length; i++)
                    {
                        billingItems[i].disabled = false;
                        if (billingItems[i].value === "") disd = true;
                    }
                    document.getElementById('submitbutton2').disabled = disd;
		      document.getElementById('snmp_pass').disabled = false;
                    break;

                case '3':
                    var billingItems = document.querySelectorAll('#mthe input[type="text"]');
                    for (var i = 0; i < billingItems.length; i++)
                    {
                        billingItems[i].disabled = true;
                    }
                    document.getElementById('submitbutton2').disabled = true;
                    break;

                case '4':
                    var billingItems = document.querySelectorAll('#mthe input[type="text"]');
                    for (var i = 0; i < billingItems.length; i++)
                    {
                        billingItems[i].disabled = true;
                    }
                    document.getElementById('submitbutton2').disabled = true;
                    break;
            }
        }

        option();

        LIST.addEventListener('change', function () {
            option();
        });

        function mcheckform()
        {
            var f = document.forms['theform2'].elements;
            var cansubmit = true;

            for (var i = 0; i < f.length; i++)
            {
                if (f[i].value.length == 0)
                    cansubmit = false;
            }
            document.getElementById('submitbutton2').disabled = !cansubmit;
        }

        function mcheckform3()
        {
            var f = document.forms['mtheform3'].elements;
            var cansubmit = true;

            for (var i = 0; i < f.length; i++)
            {
                if (f[i].value.length == 0)
                    cansubmit = false;
            }
		
	    var th = parseInt(document.getElementById('331').value,10);
	    var tl = parseInt(document.getElementById('332').value,10);
	    var gh = parseInt(document.getElementById('333').value,10);
	    var gl = parseInt(document.getElementById('334').value,10);
		
	    if (Number.isNaN(th) || Number.isNaN(tl) || Number.isNaN(gh) || Number.isNaN(gl)) {
		cansubmit=false;
	    } else {
	    	if (!(((th-gh)>(tl+gl))&&gh>=1&&gl>=1&&th>tl)) {cansubmit=false;}
	    }

            document.getElementById('submitbutton3').disabled = !cansubmit;
        }

function focuslost() {
  var th = parseInt(document.getElementById('331').value,10);
	    var tl = parseInt(document.getElementById('332').value,10);
	    var gh = parseInt(document.getElementById('333').value,10);
	    var gl = parseInt(document.getElementById('334').value,10);
		
	    if (!Number.isNaN(th)&&!Number.isNaN(tl)&&!Number.isNaN(gh)&&!Number.isNaN(gl)) {
		
	    if (!(((th-gh)>(tl+gl))&&gh>=1&&gl>=1&&th>tl)) {alert('Неверно заданы пороги температур!');}
	    }

}
        
        function mcheckform4()
        {
            var cansubmit = false;
            var p1 = $('411').value;
            var p2 = $('412').value;
            if (p1.length>0&&p1===p2) cansubmit = true;

            document.getElementById('submitbutton4').disabled = !cansubmit;
        }

        //  отключение полей ческбоксом                     
        function toggleBilling()
        {
            var inputs = document.querySelectorAll('#myForm input[type=text]');
            /*
             for (var i = 0;  i < inputs.length; i++)
             {
             inputs[i].value = '';
             };
             */
            var billingItems = document.querySelectorAll('#myForm input[type="text"]');
            for (var i = 0; i < billingItems.length; i++)
            {
                billingItems[i].disabled = !billingItems[i].disabled;
            }
            checkform();
        }


        function checkform()
        {
            var f = document.forms['theform'].elements;
            var cansubmit = true;

            for (var i = 0; i < f.length; i++)
            {
                if (f[i].value.length == 0)
                    cansubmit = false;
            }

            document.getElementById('submitbutton').disabled = !cansubmit;
        }

