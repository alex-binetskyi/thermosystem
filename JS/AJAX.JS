/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var count = 0;

function getSysId() {
    var oUpdate;
    oUpdate = new AJAX('get_sysid.cgi', function (t) {
        try {
	    $('log').value=t;
        } catch (e) {
            alert(e);
        }
    });
    oUpdate.doGet();
}

function AJAX(a, e) {
    var c = d();
    c.onreadystatechange = b;
    function d() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        } else {
            if (window.ActiveXObject) {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
    }
    function b() {
        if (c.readyState == 4) {
            if (c.status == 200) {
                if (e) {
                    e(c.responseText)
                }
            }
        }
    }

    this.doGet = function () {
        c.open("GET", a, true);
        c.send(null)
    };
    this.doPost = function (f) {
        c.open("POST", a, true);
        c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        c.setRequestHeader("ISAJAX", "yes");
        c.send(f)
    }
}
function $(a) {
    return document.getElementById(a)
}
function $$(a) {
    return document.getElementsByName(a)
}
function $$_ie(a, c) {
    if (!a) {
        a = "*"
    }
    var b = document.getElementsByTagName(a);
    var e = [];
    for (var d = 0; d < b.length; d++) {
        att = b[d].getAttribute("name");
        if (att == c) {
            e.push(b[d])
        }
    }
    return e
}

function setCookie(name, value, min_) {
    var expires = "";
    if (min_) {
        var date = new Date();
        date.setTime(date.getTime() + (min_ * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function setSessionId(value) {
    sessionStorage.setItem('session_id', value);
}

function getSessionId() {
    var res = sessionStorage.getItem('session_id');
    if (res == null)
        return "false";
    return res;
}

function LoginCallback(o) {
    if (o === '') {
        setCookie("token", '', -1);
        Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Login incorrect!!!'
});
    } else {
	if (o === 'active') {
        setCookie("token", '', -1);
        Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'System busy!!!'
});
    } else {
        setCookie("token", o, 30);
        //setSessionId(true);
        redirect_to('index.html');
    }
}
}

function doLogin() {
    let formData = new FormData(document.forms.login);
    var oUpdate;
    oUpdate = new AJAX('log_pass.cgi', function (t) {
        try {
            eval(t);
        } catch (e) {
            alert(e);
        }
    });
    oUpdate.doPost('log=' + $('log').value + '&pass=' + $('pass').value);
}

function main() {
    var res = getCookie('token');
    if (res == null) {
        redirect_to('login.html');
    }
}

function redirect_to(path) {
    var base_url = window.location.origin;
    window.location = base_url + '/' + path;
}

function getValues() {
    var oUpdate;
    oUpdate = new AJAX('monitoring.cgi', function (t) {
        try {
            eval(t);
        } catch (e) {
            alert(e);
        }
    });
    oUpdate.doGet();
}

function ValuesCallback(o) {    
    $('out1').value=o.t1;
    $('out2').value=o.t2;
    $('out3').value=o.v;
}

function monitoring() {
	    getValues;
            if (count === 0) {
                start_monitoring();
                count++;
            } else {
                stop_monitoring();
                count = 0;
            }
        }

        function start_monitoring() {
            intervalID = setInterval(getValues, 3000);
        }

        function stop_monitoring() {
            clearInterval(intervalID);
        }


function waitRedirect(o) {
    let reboot = new AJAX('reboot.cgi', function (t) {});
    reboot.doPost("");
let timerInterval;
Swal.fire({
    title: 'Restart system!',
    html: 'You will be redirected to '+o+' in <b></b> seconds.',
    timer: 10000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
            b.textContent = Math.round(Swal.getTimerLeft() / 1000)
        }, 500)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }}).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = "http://"+o+"/";
    }
})
}