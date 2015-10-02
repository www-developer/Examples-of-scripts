$(document).ready(function(){
    var info = {
        'element':0,
        'textEdit':"",
        'token':"",
        'initialText': 'поле'
    };
    function addLineList(token,text){
        $('table > tbody:last').append('<tr><td>'+text+'</td><td><span class="cursor">ред</span><span class="cursor">удл</span></td></tr>');
        $('table > tbody > tr:last').attr({'data-key':token,'data-meaning':text});
        $('table > tbody > tr:last > td:last> span:first').attr({'data-action':'edit','data-id':token});
        $('table > tbody > tr:last > td:last> span:last').attr({'data-action':'delete','data-id':token});
    };
    $('#add-record').click(function(){
        console.log('-----#add-record----------');
        var rand = function(){ return Math.random().toString(36).substr(2);};
        var key = function(){ return rand()+rand();};
        var localStObj = {};
        localStObj.text = $('#txt-field').val();
        localStObj.time = $.now();
        localStObj.token = key();
        console.log("localStObj: ",localStObj);
        localStorage.setItem(localStObj.token,JSON.stringify(localStObj));
        addLineList(localStObj.token,localStObj.text);
        $('#txt-field').val(info.initialText);
        console.log('-----#add-record----------');
    });
    $('#save-record').click(function(){
        console.log('-----#save-record----------');
        info.textEdit = $('#txt-field').val();
        console.log('info.textEdit: ',info.textEdit, 'info.element: ',info.element );
        $(info.element).html(info.textEdit);
        var temp = localStorage.getItem(info.token);
        var localStrTemp = JSON.parse(temp);
        localStrTemp.text = info.textEdit;
        console.log('localStObj.token:',localStrTemp.token, " ",'info.token :',info.token);
        localStorage.setItem(info.token, JSON.stringify(localStrTemp));
        $('#save-record').toggleClass('no-active');
        $('#add-record').toggleClass('no-active');
        $('#txt-field').val(info.initialText);
        console.log('-----#save-record----------');
    });
    $('table').on('click', '[data-action="edit"]', function(e) {
        info.token = $(e.target).attr('data-id');
        info.element = $(e.target).parent().prev();
        console.log("info.element", info.element);
        var text = $(e.target).parent().prev().text();
        console.log("text", text);
        $('#txt-field').val(text);
        $('#add-record').toggleClass('no-active');
        $('#save-record').toggleClass('no-active');
    });
    $('table').on('click','[data-action="delete"]',function(e){
        localStorage.removeItem($(e.target).attr('data-id'));
        var element = $(e.target).parent().parent();
        element.remove();
        console.log(element);
    });
    if(localStorage.length>0){
        var arrLocalSt = [];
        for(var i = 0; i < localStorage.length; i++) {
            console.log('localStorage.key', localStorage.key(i));
            var temp = localStorage.getItem(localStorage.key(i));
            console.log('temp',temp);
            arrLocalSt[i] = JSON.parse(temp);
        }
        arrLocalSt.sort(function (a, b) {
            if (a.time > b.time) { return 1;}
            if (a.time < b.time) { return -1;}
            return 0;
        });
        for(var i = 0; i < arrLocalSt.length; i++) {
            var text = arrLocalSt[i]['text'];
            var token = arrLocalSt[i]['token'];
            addLineList(token,text);
        }
    }
});
