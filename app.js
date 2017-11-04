var express = require("express"),
    app = express(),
    path = __dirname + '/views/',
    router = express.Router(),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: false
})); 
app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));




app.set('views', path);
app.set('view engine', 'ejs');


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


var con = mysql.createConnection({
    host: "localhost",
    user : 'root',
    password : '',
    database : 'hallbooking',
    multipleStatements: true});


con.connect(function(error){
if(error){
console.log("Error Connecting Yo!");
return;
}else{
    console.log(" Connected Yo!");
}
});

app.get('/',function(req,res){
    res.render('index');
})

app.get('/login',function(req,res){
    res.render('selectUser');
})

app.get('/deanLogin',function(req,res){
    
    res.render('deanLogin');
})

app.get('/facilityLogin',function(req,res){
    res.render('facilityLogin');
})

app.get('/facultyLogin',function(req,res){
    res.render('facultyLogin');
})

app.get('/clubLogin',function(req,res){
    res.render('clubLogin');
})

app.get('/request',function(req,res){
    res.render('request');
})

app.get('/pdean',function(req,res){
    res.render('pdean');
})



app.post('/dashboardDean',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    con.query("select * from users where Username='"+username+"' and Designation='Dean';", function(err,rows){
        if(!err){
            if(rows.length>0){

                 if(password===rows[0].Password){
                    res.render("dashboardDean");
                }else{
                    console.log("Password is Wrong Buddy!");
                    res.render("error",{message:"Password is Wrong Buddy!"});
                }    
                
            }else{
                console.log("Username Not Found!");
                res.render("error",{message:"Username Not Found!"});
            }
            
                
        }else{
            console.log("Dont Poke Your Nose where you don't Belong!");
            res.render("error",{message:"Dont Poke Your Nose where you don't Belong!"});
        }
    });
    
  
    //res.render('dashboardDean');
})

app.post('/dashboardFaculty',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    con.query("select * from users where Username='"+username+"' and Designation='Faculty';", function(err,rows){
        if(!err){
            if(rows.length>0){

                 if(password===rows[0].Password){
                    res.render("dashboardFaculty");
                }else{
                    console.log("Password is Wrong Buddy!");
                    res.render("error",{message:"Password is Wrong Buddy!"});
                }    
                
            }else{
                console.log("Username Not Found!");
                res.render("error",{message:"Username Not Found!"});
            }
            
                
        }else{
            console.log("Dont Poke Your Nose where you don't Belong!");
            res.render("error",{message:"Dont Poke Your Nose where you don't Belong!"});
        }
    });
    
  
    //res.render('dashboardFaculty');
})

app.post('/dashboardFacility',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    con.query("select * from users where Username='"+username+"' and Designation='Facility';", function(err,rows){
        if(!err){
            if(rows.length>0){

                 if(password===rows[0].Password){
                    res.render("dashboardFacility");
                }else{
                    console.log("Password is Wrong Buddy!");
                    res.render("error",{message:"Password is Wrong Buddy!"});
                }    
                
            }else{
                console.log("Username Not Found!");
                res.render("error",{message:"Username Not Found!"});
            }
            
                
        }else{
            console.log("Dont Poke Your Nose where you don't Belong!");
            res.render("error",{message:"Dont Poke Your Nose where you don't Belong!"});
        }
    });
    
  
    //res.render('dashboardFacility');
})

app.post('/dashboardClub',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    con.query("select * from users where Username='"+username+"' and Designation='Dhara';", function(err,rows){
        if(!err){
            if(rows.length>0){

                 if(password===rows[0].Password){
                    res.render("dashboardClub");
                }else{
                    console.log("Password is Wrong Buddy!");
                    res.render("error",{message:"Password is Wrong Buddy!"});
                }    
                
            }else{
                console.log("Username Not Found!");
                res.render("error",{message:"Username Not Found!"});
            }
            
                
        }else{
            console.log("Dont Poke Your Nose where you don't Belong!");
            res.render("error",{message:"Dont Poke Your Nose where you don't Belong!"});
        }
    });
    
  
    //res.render('dashboardDhara');
})

app.get('/dashboardFaculty',function(req,res){
    res.render('dashboardFaculty');
})
app.get('/dashboardFacility',function(req,res){
    res.render('dashboardFacility');
})
app.get('/dashboardClub',function(req,res){
    res.render('dashboardClub');
})


app.post('/makeRequest',function(req,res){
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var mname = req.body.mentor_name;
    var sname = req.body.sec_name;
    var cname = req.body.club_name;
    var hname = req.body.hall_name;
    var ename = req.body.event_name;
    var wname = req.body.wing_name;
    var startTime = req.body.from_slot;
    var stopTime = req.body.to_slot;
    var edate = req.body.date_slot;
        
    var re = {
        Fname:fname,
        Lname:lname,
        ClubName:cname,
        FacultyOrMentorName:mname,
        ClubSecName: sname,
        Wing:wname,
        Hname:hname,
        EventDate:edate,
        FromTime:startTime,
        ToTime:stopTime,
        EventName:ename

    };


    con.query('insert into requests set ?',re,function(err,result){
        if(!err){console.log("success");
        res.render("dashboardClub",{message:"Yaay! It Worked???"});
        }else{
            console.log(err);
            res.render("error",{message:"Crap, not working."});
        }
        
           });


});

app.get('/aaa',function(req,res){
    var request = "Select * from requests;"

    con.query(request,function(req,data){
        console.log(data);
        res.render('pdean',{res:data});
    });
})


