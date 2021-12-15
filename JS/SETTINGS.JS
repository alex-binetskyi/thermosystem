

function SettingsCallback(o) {
    if ($('color-1').checked && o.dhcp === '0') {
        $('color-1').checked = false;
        toggleBilling();
        document.getElementById('submitbutton').disabled = !this.checked;
    } else {
        if ($('color-1').checked === false && o.dhcp === '1') {
            $('color-1').checked = true;
            toggleBilling();
            document.getElementById('submitbutton').disabled = !this.checked;
        }
    }
    var arrayOfStrings = o.ip.split('.');
    if (arrayOfStrings.length === 4) {
        document.getElementById("111").value = arrayOfStrings[0];
        document.getElementById("112").value = arrayOfStrings[1];
        document.getElementById("113").value = arrayOfStrings[2];
        document.getElementById("114").value = arrayOfStrings[3];
    }
    arrayOfStrings = o.mask.split('.');
    if (arrayOfStrings.length === 4) {
        document.getElementById("121").value = arrayOfStrings[0];
        document.getElementById("122").value = arrayOfStrings[1];
        document.getElementById("123").value = arrayOfStrings[2];
        document.getElementById("124").value = arrayOfStrings[3];
    }
    arrayOfStrings = o.gw.split('.');
    if (arrayOfStrings.length === 4) {
        document.getElementById("131").value = arrayOfStrings[0];
        document.getElementById("132").value = arrayOfStrings[1];
        document.getElementById("133").value = arrayOfStrings[2];
        document.getElementById("134").value = arrayOfStrings[3];
    }
    if (o.snmp === "0") {
        $('LIST').value = "off";
    } else {
        $('LIST').value = "SNMP";
    }

    arrayOfStrings = o.snmp_srv.split('.');
    if (arrayOfStrings.length === 4) {
        document.getElementById("221").value = arrayOfStrings[0];
        document.getElementById("222").value = arrayOfStrings[1];
        document.getElementById("223").value = arrayOfStrings[2];
        document.getElementById("224").value = arrayOfStrings[3];
    }

    arrayOfStrings = o.ntp.split('.');
    if (arrayOfStrings.length === 4) {
        document.getElementById("231").value = arrayOfStrings[0];
        document.getElementById("232").value = arrayOfStrings[1];
        document.getElementById("233").value = arrayOfStrings[2];
        document.getElementById("234").value = arrayOfStrings[3];
    }
    option();
    $('current_timestamp').innerHTML=o.curtime;
    $('331').value=o.termh;
    $('332').value=o.term1;
    $('333').value=o.gisth;
    $('334').value=o.gist1;
    $('335').value=o.alarm;
    $('snmp_pass').value=o.snmp_pass;
}

function getSettings() {
    setInterval(getCurTime, 1000);
    var oUpdate;
    oUpdate = new AJAX('get_settings.cgi', function (t) {
        try {
            eval(t);
        } catch (e) {
            alert(e);
        }
    });
    oUpdate.doGet();
}

function getCurTime() {
    var oUpdate;
    oUpdate = new AJAX('get_curtime.cgi', function (t) {
        try {
            eval(t);
        } catch (e) {
            alert(e);
        }
    });
    oUpdate.doGet();
}

function CallbackCurTime(o) {
    $('current_timestamp').innerHTML=o.curtime;
}