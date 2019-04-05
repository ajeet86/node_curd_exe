



module.exports = {
	
	
	
	
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