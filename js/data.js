$(function(){
    $(document).on("mousedown",function(e){
        var obj = e.target;
        //console.log($(obj).offsetX);
        var ox = e.offsetX;
        var oy = e.offsetY;
        $(document).on("mousemove",function(e){
            var px = e.pageX;
            var py = e.pageY;
            $(obj).trigger("drag",{left:px-ox,top:py-oy})
        })
        $(document).on("mouseup",function(){
            $(document).off("mouseup");
            $(document).off("mousemove");

        })

    })
    //输入框的动画
    //按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    //输入框关闭的按钮
    var formClose=$(".formclose");
    var flag=true;
    add.click(function(){
        if(flag) {
            form.attr({"data-a":"animate-show"}).css({display:"block"});
            flag=false;
        }else{
            form.attr({"data-a":"animate-hide"}).css({display:"block"});
            flag=true;
        }
    })
    formClose.click(function(){
        form.attr({"data-a":"animate-hide"}).css({display:"block"});
        flag=true;
    });


    /*表单的验证*/

    $(".submitbtn").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();

        if(textv==""){
            alert("标题不能为空");

            return;
        }
        //if(conv==""){
        //    alert("内容不能为空");
        //    return;
        //}
        if(timev==""){
            alert("时间必选");
            return;
        }

        //存储信息
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);

        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

        //显示信息

        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random(),
            display:"block"
        }).attr("data-animate","animate-sd").attr("id",obj.id);
        copy.find('.title-con').html(textv);
        copy.find('.con-con').html(conv);
        copy.find('.time-con').html(timev);
    })

    //页面加载显示已经保存的内容
    var messages = localStorage.message == null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<messages.length;i++){
        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random()
        }).attr("id",messages[i].id);
        copy.find('.title-con').html(messages[i].title);
        copy.find('.con-con').html(messages[i].con);
        copy.find('.time-con').html(messages[i].time);
    }

    //拖拽事件
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            left:data.left+"px",
            top:data.top+"px"
        });
        e.preventDefault()
    });
    $(document).delegate(".con","mousedown",function(e,data){
        $('.con').css({
            zIndex:0,
            boxShadow:""
        });
        $(this).css({zIndex:1, boxShadow:"0 0 5px #46b8da"});
        e.preventDefault()
    })
    $(document).delegate(".close1","click",function(){
        var id = $(this).parent().attr("id");
        var arr =JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.message= JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })

});