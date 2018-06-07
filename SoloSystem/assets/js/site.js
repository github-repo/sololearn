$(function (){

//alert("This code works best when running it from a browser and from your laptop or desktop PC.");

//declare structure variables
var body;
var w=window.innerWidth;
var h=window.innerHeight;
var canvas;
var click; //shows xy of click
var glow; //glow div for sun
var menu; //menu container
var input; //input tag
var btnGo; //Go button
var profile; //profile container
var sldp; //user picture
var slname; //user name
var sldetails; //profile details
var loader; //loader object
var cdp; //course picture
var cname; //course name
var cdetails; //course details
var link; //Link to profile
//var fps=(1000/60);
var siteDown = true; //https://gavinchristians.com

//creates HTML/CSS structure for code
function createWorld(){
    //create or get elements
    body = $("body");
    canvas = $("<canvas width='"+w+"' height='"+h+"'></canvas>");
    click = $("<p></p>");
    glow = $("<div></div>");
    menu = $("#menu");
    input = $("#Sid");
    btnGo = $("#btnGo");
    profile = $("#profile");
    sldp = $("#dp");
    slname = $("#name");
    sldetails = $("#details");
    loader = $("<div></div>");
    cdp = $("<div></div>");
    cname = $("<p></p>");
    cdetails = $("<p></p>");
    link = $("a");
    //apply css
    body.css({
    "overflow":"hidden",
    "width":"100%",
    "height":"100%",
    "background-color":"black",
    "position":"relative",
    });
    canvas.css({
    "width":w+"px",
    "height":h+"px",
    "background-color":"black",
    "position":"absolute",
    "top":"0px",
    "left":"0px",
    "z-index":"2"
    }); 
    click.css({
    "color":"black",
    "background-color":"white",
    "position":"absolute",
    "top":"0px",
    "left":"0px",
    "z-index":"5"
    });
    glow.css({
    "width":"50px",
    "height":"50px",
    "background-color":"rgba(0,0,0,0.1)",
    "position":"absolute",
    "top":(h/2-25)+"px",
    "left":(w/2-25)+"px",
    "z-index":"5",
    "animation":"glow 1s ease-in-out 0s infinite alternate",
    "-webkit-animation":"glow 1s ease-in-out 0s infinite alternate",
    "-moz-animation":"glow 1s ease-in-out 0s infinite alternate",
    "-o-animation":"glow 1s ease-in-out 0s infinite alternate"
    });
    menu.css({
    "width":"300px",
    "height":"450px",
    //"border":"2px solid white",
    "text-align":"center",
    "position":"absolute",
    "top":(h/2-225)+"px",
    "left":(w/2-150)+"px",
    "z-index":"6"
    });
    profile.css({
    "width":"100%",
    "height":"100px",
    //"border":"2px solid white",
    //"text-align":"center",
    "opacity":"0",
    "position":"absolute",
    "top":"0px",
    "left":"0px",
    "z-index":"5"
    });
    loader.css({
    "width":"50px",
    "height":"50px",
    "background-color":"none",
    "border":"2px solid white",
    "display":"none",
    "animation":"loader 1s linear 0s infinite",
    "-webkit-animation":"loader 1s linear 0s infinite",
    "-moz-animation":"loader 1s linear 0s infinite",
    "-o-animation":"loader 1s linear 0s infinite",
    "position":"absolute",
    "top":((h/2)-25)+"px",
    "left":((w/2)-25)+"px",
    "z-index":"5"
    });
    cdp.css({
    "width":"70px",
    "height":"70px",
    "background-color":"none",
    "background-size":"cover",
    "border-radius":"50%",
    "float":"left",
    "margin":"10px"
    });
    cname.css({
    "text-align":"left"
    });
    cdetails.css({
    "text-align":"left"
    });
    //elements to DOM
    body.append(canvas);
    body.append(click); 
    body.append(glow);
    body.append(menu);
    body.append(profile);
    body.append(loader);
}
createWorld();



//----section for geting user data----//

//Credit: This section is inspired by Burey's code
//Code:   SoloInfo (cors-anywhere API)
//Url:    https://code.sololearn.com/W6f4L3q0CFKI/?ref=app

//---create global variables---//
//Sololearn User ID
var id;
//Sololearner's profile pic
var dp = new Image();
//Sololearner's name
var name;
//Sololearner's level
var level;
//Sololearner's experience points
var xp;
//Amount of courses
var courses;
//Course names
var course;
//Course experience points
var courseXp;
//Amount of certificates
var certs;
//Certificate names
var cert;
//Certificate dates
var certDate;
//Amount of badges
var badges;
//Course list object
var cList = {
        HTMLFundamentals:
        ["HTML Fundamentals",
        //1=course exists;
        //2=course xp
        //3=course cert exists
        //4=course cert date
        false,false,false,false],
        CSSFundamentals:
        ["CSS Fundamentals",
        false,false,false,false],
        JavaScriptTutorial:
        ["JavaScript Tutorial",
        false,false,false,false],
        jQueryTutorial:
        ["jQuery Tutorial",
        false,false,false,false],
        PHPTutorial:
        ["PHP Tutorial",
        false,false,false,false],
        SQLFundamentals:
        ["SQL Fundamentals",
        false,false,false,false],
        Python3Tutorial:
        ["Python 3 Tutorial",
        false,false,false,false],
        C_Tutorial:
        ["C# Tutorial",
        false,false,false,false],
        CTutorial:
        ["C++ Tutorial",
        false,false,false,false],
        JavaTutorial:
        ["Java Tutorial",
        false,false,false,false],
        RubyTutorial:
        ["Ruby Tutorial",
        false,false,false,false],
        SwiftFundamentals:
        ["Swift Fundamentals",
        false,false,false,false]
    };

/*extracts the neccesary data from the
 *data agrument passed and stores it
 *in global variables*/
function getData(data, Sid){
    try{
    //parses xml data
    var text = data;
    //parse the text to DOM object
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(text, "text/html");
    
    //extracts profile info with selectors
    //e.g by class, id, element 
    var user = htmlDoc.querySelector(".user");
    id = Sid;
    name = user.querySelector("h1").innerHTML.trim();
    level = user.querySelector("div.detail div").innerHTML.trim();
    level = level.substring(20,level.length).trim();
    xp = user.querySelector("span").innerHTML.trim();
    courses = htmlDoc.querySelectorAll(".courseWrapper"); //e.g courses.length
    course = htmlDoc.querySelectorAll(".course"); //e.g course[0].title
    courseXp = htmlDoc.querySelectorAll(".courseXp"); //e.g courseXp[0].innerHTML
    certs = htmlDoc.querySelectorAll(".certificate"); //e.g certs.length
    cert = htmlDoc.querySelectorAll(".certificate"); //e.g cert[0].title
    certDate = htmlDoc.querySelectorAll(".date"); //e.g certDate[0].innerHTML.replace(/  /g,'').replace(/\n/g,''),
    var a = htmlDoc.querySelectorAll(".achievement");
    var b = htmlDoc.querySelectorAll(".disabled");
    badges = a.length - b.length;
    
    //stores course info in course 
    //list object
    for(c=0;c<courses.length;c++){
        z=course[c].title.replace(/[\+\s]/g,'').replace(/\#/g,'_');
        cList[z][1]=true;
        cList[z][2]=courseXp[c].innerHTML;
    }
    
    //stores certificate info in
    //course list object
    for(c=0;c<certs.length;c++){
        z=cert[c].title.replace(/[\+\s]/g,'').replace(/\#/g,'_');
        y=certDate[c].innerHTML.replace(/  /g,'').replace(/\n/g,'');
        cList[z][3]=true;
        cList[z][4]=y;
    }
    
    }
    catch(error){
        loader.css("display","none");
        alert("Oops! An error occurred.\n\n\""+error.message+"\"\n\n-Check your input and try again or\n-Try using a browser and not the app.");
        menu.css("display","initial");
        profile.css("opacity","0");
        input.val("");
    }
}

function getDataVanilla(Sid){
    try{
    /*
    make the request using vanilla JavaScript
    */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            getData(xhr.responseText, Sid);
            // pass data to callback function
            showData();
            loader.css("display","none");
        }
        else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400){
        }
    }
    var url = "https://www.sololearn.com/Profile/"+Sid;
    // use cors-anywhere API to make the request
    url = 'https://cors-anywhere.herokuapp.com/'+url;
    xhr.open('GET', url, true);
    xhr.send(null);
    }
    catch(error){
        //alert(error.message)
    }
    
    
}

function showData(){
    try{
    // call back function, data is a json containing id, name, level and XP
    dp.src="https://api.sololearn.com/Uploads/Avatars/"+id+".jpg";
    sldp.css("background-image","url("+dp.src+")");
    link.attr("href","https://www.sololearn.com/Profile/"+id);
    slname.html(name);
    sldetails.html(
        "Level: "+level+" | "+
        xp+" | "+
        "Badges: "+badges+"<br>"+
        "Courses: "+courses.length+" | "+
        "Certificates: "+certs.length
        );
    genSoloSys();
    }
    catch(error){
        //alert(error.message)
    }
}

//-----------------------------------//



var ggc=canvas[0].getContext('2d');

function genSoloSys(){
    //-----variables for the SoloSystem------//
    //sets amount of layers
    var layers=12;
    //sets width of space bewteen layers
    var layerWidth=18;
    //sets layer thickness
    var lt=1;
    //planet width
    var pw=7;
    //sets width of spacing
    var spacingWidth=20;
    //creates an array for the layers
    var radius = new Array();
    //populates layer array with radiuses
    for(a=0;a<layers;a++){
        radius[a]=45+(layerWidth*a);
    }
    //creates circle center coordinates
    var cx = w/2;
    var cy = h/2;
    //will collect the angles of the
    //entry points of each layer
    var layerAngles = new Array()
    for(v=0;v<layers;v++){
        layerAngles[v] = 0;
    }
    //will collect the angles of the
    //entry points of each layer
    var mAngle=0;
    var moonAngles = new Array()
    for(v=0;v<layers;v++){
        moonAngles[v] = 0;
    }
    //planet colors
    pColor = [
        "#f16424",//HTML Fundamentals
        "#23aae1",//CSS Fundamentals
        "#efd94f",//JavaScript Tutorial
        "#1a74ba",//jQuery Tutorial
        "#5e82ba",//PHP Tutorial
        "#dfe0e2",//SQL Fundamentals
        "#fdc939",//Python 3 Tutorial
        "#652d92",//C# Tutorial
        "#076390",//C++ Tutorial
        "#f79823",//Java Tutorial
        "#e04d3f",//Ruby Tutorial
        "#ee4631" //Swift Fundamentals
        ];

    var cSList = [
        "HTMLFundamentals",
        "CSSFundamentals",
        "JavaScriptTutorial",
        "jQueryTutorial",
        "PHPTutorial",
        "SQLFundamentals",
        "Python3Tutorial",
        "C_Tutorial",
        "CTutorial",
        "JavaTutorial",
        "RubyTutorial",
        "SwiftFundamentals"
    ];
    
    //for drawing images
    function draw(image,x,y,width,height){
        //checks if image is loaded
        if(!image.complete){
            setTimeout(function (){
            draw(image,x,y,width,height);
            },50);
            return;
        }
        //draws the image if loaded
        ggc.drawImage(image,x,y,width,height);
    }
    //declare images
    //----Part of game----//
    //make log image object
    var image = new Image();
    if(!siteDown){
        image.src = "https://gavinchristians.com/sololearn/logo.png";
    }else{
        image.src = "assets/images/logo.png";
    }
    //--------------------------------//

    //generates the solosystem
    function genSol(){
        //draws the layers of the solosystem
        ggc.clearRect(0,0,w,h);
        draw(image,cx-25,cy-25,50,50);
        for(g=0;g<layers;g++){
            //sets color of layers
            ggc.strokeStyle="rgba(255,255,255,0.4)";
            arc(cx,cy,radius[g]);
            //sets the width of the planets
            ggc.lineWidth=1;
            //draws planets for each layer
            drawPlanets(g);
        }
    
    }
    genSol();

    //animates the solosystem
    function animate(){
        ggc.clearRect(0,0,w,h);
        draw(image,cx-25,cy-25,50,50);
        //draws the layers of the solosystem
        for(g=0;g<layers;g++){
            //sets color of layers
            ggc.strokeStyle="rgba(255,255,255,0.4)";
            arc(cx,cy,radius[g]);
            //sets the width of the planets
            ggc.lineWidth=1;
            //updates planets for each layer
            drawUpdate(g);
        }
        
        /*//For troubleshooting
        //Shows hitboxes for planets
        for(n=0;n<layers;n++){
            angle=layerAngles[n];
            loc=getXY(radius[n],angle);
            ggc.strokeStyle="red";
            ggc.lineWidth=1;
            ggc.rect(loc[0]-10, loc[1]-10, 20, 20);
            ggc.stroke();
        }
        ///////////*/
        
        //starts the recursive function,
        //creates the animation illusion
        window.requestAnimationFrame(animate);
    }

    //returns a random number between the specified values
    function range(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min))+min;
    }

    //returns the coordinates of an angle on a circle
    //depending on it's radius
    function getXY(radius_,angle_){
        x=cx+(radius_*Math.cos((angle_+(-90))*(Math.PI/180)));
        y=cy+(radius_*Math.sin((angle_+(-90))*(Math.PI/180)));
        return [x,y];
    }

    //draws the layers, takes circle center coordinates
    //plus radius as arguments
    function arc(x,y,r){
        ggc.beginPath();
        ggc.lineWidth=lt;
        ggc.arc(x,y,r,0,Math.PI*2);
        ggc.stroke();
    }

    //draws planets based on random angles
    function drawPlanets(lvl){
        //gets random number between 0 & 360
        angle=range(0,360);
        mAngle=range(0,360);
        //assigns the current layer planet a
        //random angle
        layerAngles[lvl]=angle;
        moonAngles[lvl]=mAngle;
        /*Checks if the selected course
         *is one of the courses the user
         *has.
         *If true, draw solid planet.
         *If false, draw hollow planet.
        */
        if(cList[cSList[lvl]][1]){
            //sets color of planet
            ggc.fillStyle=pColor[g];
            ggc.beginPath();
            loc=getXY(radius[lvl],angle);
            ggc.arc(loc[0],loc[1],pw,0,Math.PI*2);
            ggc.fill();
            
            
        if(cList[cSList[lvl]][3]){
            ggc.beginPath();
            //loc=getXY(radius[lvl],angle);
            x=loc[0]+(13*Math.cos((mAngle+(-90))*(Math.PI/180)));
            y=loc[1]+(13*Math.sin((mAngle+(-90))*(Math.PI/180)));
            ggc.arc(x,y,2,0,Math.PI*2);
            ggc.fill();
        }
        }
        else{
            //sets color of planet
            ggc.strokeStyle=pColor[g];
            ggc.beginPath();
            loc=getXY(radius[lvl],angle);
            ggc.arc(loc[0],loc[1],pw,0,Math.PI*2);
            ggc.stroke();
            
            /*
            ggc.beginPath();
            //loc=getXY(radius[lvl],angle);
            x=loc[0]+(20*Math.cos((mAngle+(-90))*(Math.PI/180)));
            y=loc[1]+(20*Math.sin((mAngle+(-90))*(Math.PI/180)));
            ggc.arc(x,y,2,0,Math.PI*2);
            ggc.stroke();*/
        }
    }

    //Updates planet positions
    function drawUpdate(lvl){
        /*Checks if the selected planet's
         *angle is within the range of
         *0-360.
         *-Increments the angle when within
         *range
         *-Resets the angle when out of
         *range
        */
        if(layerAngles[lvl]>360){
            layerAngles[lvl]=0;
        }
        else if(layerAngles[lvl]<0){
            layerAngles[lvl]=360;
        }
        else{
            layerAngles[lvl]+=1/(lvl+1);
        }
        angle=layerAngles[lvl];
        
        
        if(moonAngles[lvl]>360){
            moonAngles[lvl]=0;
        }
        else if(moonAngles[lvl]<0){
            moonAngles[lvl]=360;
        }
        else{
            moonAngles[lvl]+=1*((12-lvl)/3);
        }
        mAngle=moonAngles[lvl];
        /*Checks if the selected course
         *is one of the courses the user
         *has.
         *If true, update solid planet.
         *If false, update hollow planet.
        */
        if(cList[cSList[lvl]][1]){
            //sets color of planet
            ggc.fillStyle=pColor[g];
            ggc.beginPath();
            loc=getXY(radius[lvl],angle);
            ggc.arc(loc[0],loc[1],pw,0,Math.PI*2);
            ggc.fill();
            
            
            if(cList[cSList[lvl]][3]){
            ggc.beginPath();
            x=loc[0]+(13*Math.cos((mAngle+(-90))*(Math.PI/180)));
            y=loc[1]+(13*Math.sin((mAngle+(-90))*(Math.PI/180)));
            ggc.arc(x,y,2,0,Math.PI*2);
            ggc.fill();
            }
        }
        else{
            //sets color of planet
            ggc.strokeStyle=pColor[g];
            ggc.beginPath();
            loc=getXY(radius[lvl],angle);
            ggc.arc(loc[0],loc[1],pw,0,Math.PI*2);
            ggc.stroke();
            
            /*
            ggc.beginPath();
            x=loc[0]+(15*Math.cos((mAngle+(-90))*(Math.PI/180)));
            y=loc[1]+(15*Math.sin((mAngle+(-90))*(Math.PI/180)));
            ggc.arc(x,y,2,0,Math.PI*2);
            ggc.stroke();*/
        }
    }
    window.requestAnimationFrame(animate);

    //Display's planet when user clicks
    //on it.
    window.onclick=function(e){
        var x = e.pageX;
        var y = e.pageY;
        
        /*//For troubleshooting
        //Shows coordintates of click
        click.css({
            "top":y+"px",
            "left":x+"px"
        });
        click.html("width:"+x+" height:"+y);
        //////////////////*/
        
        /*Checks if user click is
         *within a 10x10 square of
         *the planet's location
        */
        for(n=0;n<layers;n++){
            angle=layerAngles[n];
            loc=getXY(radius[n],angle);
            if(x>loc[0]-10&&x<loc[0]+20){
                if(y>loc[1]-10&&y<loc[1]+20){
                    showCourse(n);
                }
            }
        }
    }
    
    var newlyAdded = [
        "1014",
        "1023",
        "1024",
        "1082",
        "1059",
        "1060",
        "1073",
        "1051",
        "1080",
        "1068",
        "1081",
        "1075"
    ];
    //
    function showCourse(lvl){
        menu.css({
            "width":"320px",
            "height":"150px",
            "display":"initial",
            "border":"2px solid white",
            "border-radius":"5px",
            "background-color":"rgba(0,0,0,0.5)",
            "top":(cy-75)+"px",
            "transition":"none",
            "-webkit-transition":"none",
            "-moz-transition":"none",
            "-o-transition":"none"
        });
        menu.css("opacity","1");
        menu.html("");
        if(cList[cSList[lvl]][1]){
            cname.html(cList[cSList[lvl]][0] +"<br>"+cList[cSList[lvl]][2]);
        }
        else{
            cname.html(cList[cSList[lvl]][0]+"<br>Status: Locked/Hidden");
        }
        if(cList[cSList[lvl]][3]){
            cdetails.html("Certificate: Yes<br>"+cList[cSList[lvl]][4]
           );
        }
        else{
            cdetails.html("Certificate: No");
        }
        if(!siteDown){
            cdp.css("background-image","url\('https://www.gavinchristians.com/sololearn/"+lvl+".png'\)");
        }else{
            cdp.css("background-image","url\('https://www.sololearn.com/Icons/Courses/"+newlyAdded[lvl]+".png'\)");
        }
        menu.append(cdp);
        menu.append(cname);
        menu.append(cdetails);
        
        setTimeout(function(){
            menu.css({
            "transition":"opacity 2s ease-in",
            "-webkit-transition":"opacity 2s ease-in",
            "-moz-transition":"opacity 2s ease-in",
            "-o-transition":"opacity 2s ease-in"
            });
            menu.css("opacity","0");
        },2000);
    }
}

btnGo.on("click",function(){
    try{
        if(isNaN(input.val())){
            alert("Your Sololearn ID consists only of numbers.\nYou can find it in your url when\nyou view your profile in a browser.");
            input.val("");
        }
        else{
            id = input.val();
            menu.css("display","none");
            profile.css("opacity","1");
            loader.css("display","initial");
            getDataVanilla(id);
        }
    }
    catch(error){
        alert(error.message);
    }
});

});