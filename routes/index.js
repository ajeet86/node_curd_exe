



module.exports = {
	
	
	
	 getHomePaginate: (req, res) => {   
// Mention table from where you want to fetch records example-users
//var table = ["players"]; 
//To calculate Total Count use MySQL count function
//var query = "Select count(*) as TotalCount from ??"; 
//query = mysql.format(query, table);
//connection.query(query, function(err, rows) {
								   
					
					let pageId = req.params.id;
					let startNum = '';
					let LimitNum ='';
					let current='';
					let pages='';
					if (typeof pageId !== 'undefined'){
						   if(pageId==1){
							startNum = 0;
							LimitNum = 2;
							current=1;
							pages=1;
						   }else{  
							startNum = parseInt(pageId);
							LimitNum = 2;
							current=parseInt(pageId);   
						   }
					
					//pages=pageId;
					
					}else{
					startNum = 0;
					LimitNum = 2;
					current=1;
					pages=1;
					}
					
		
				
	//	console.log(LimitNum+'asasas'+startNum)	;					   
								   
		let query = "Select count(*) as TotalCount from `players`"; // query database to get all the players						   
db.query(query, (err, result) => {								   
								   
 if(err){
   return err;
 }else{ 
  //store Total count in variable
  let totalCount = result[0].TotalCount;
  pages=Math.ceil(totalCount/2);
  console.log(totalCount+'djdjdjdjd'+pages);
  /* startNum = 0;
      LimitNum = 3;
 if(req.body.start == '' || req.body.limit == ''){
      startNum = 0;
      LimitNum = 3;
   }
 else{
     //parse int Convert String to number 
      let startNum = parseInt(req.body.start);
      let LimitNum = parseInt(req.body.limit);
   }*/
}
console.log(startNum+'========'+LimitNum);
});
var query1 = "Select * from ?? ORDER BY id ASC limit ? OFFSET ?";
//Mention table from where you want to fetch records example-users & send limit and start 
console.log(query1);
var table = ["players",LimitNum,startNum];
query = db.format(query1, table);
db.query(query, function(err, rest) {
 if(err){
  res.json(err);
}
else{
      res.render('index_paginate.ejs', {
                title: 'welcomw aj',
                players: rest,
				pages :pages,
				current :current,
            });
}

});


},
	
	
	
	
	
	
//this function is realted list index page 	
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
        	// console.log(result);
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'welcomw aj',
                players: result
            });
        });
    },
	
	
	//this function is related with genrate pdf 
	genPdf:(req, res) => {
		
		 let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
        var data_res= db.query(query, (err, result) => {
        	 //console.log(result);
            if (err) {
                res.redirect('/');
            }
			
		    if(result.length>0){
				var ll='';
				
				
				 for (var i=0; i<result.length; i++){
				ll +='<tr>';	 
            ll +=  ' <td>'+result[i].id+'</td>';
			 ll +=  ' <td>'+result[i].first_name+'</td> ';
			  ll +=  '<td>'+result[i].last_name+'</td> ';
			   ll +=  '<td>'+result[i].position+'</td> ';
			    ll +=  ' <td>'+result[i].number+'</td> ';
				ll +=  ' <td>'+result[i].user_name+'</td> ';
				ll +='</tr>';
        }
				
		
							var fs = require('fs');
							var pdf = require('html-pdf');
							var html = '<table><tr><th >ID</th><th >Image</th><th >First Name</th><th >Last Name</th><th >Position</th><th>Number</th><th >Username</th><th >Action</th></tr>'+ll+'</table>';
							var options = { format: 'Letter' };
							
							
							pdf.create(html, options).toFile('public/assets/businesscard.pdf', function(err, res) {
							if (err) return console.log(err);
							console.log(res); // { filename: '/app/businesscard.pdf' }
							});
			}
				 var file = 'public/assets/businesscard.pdf';
  res.download(file); // Set disposition and send it.

			   
			});
	  
				
		
	
		},
	
};	