var aws = require('aws-sdk');
aws.config.loadFromPath('ses_config.json');

/* Get Random number */
this.alpha_random_number = function(length) {

	var possiblenumber = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
	var alpha_number = '';
    for(var i = 0; i < length; i++) {

        alpha_number += possiblenumber.charAt(Math.floor(Math.random()*possiblenumber.length));
    }
    return alpha_number;
}

/* First capital letter */
this.first_capital_letter = function(string) {

	return string.charAt(0).toUpperCase()+string.slice(1);
}

/* Check variable data */
this.is_not_empty = function(slug) {

    if(slug != '' && slug != null && slug != 'null' && slug != 'undefined' && slug != undefined) {

		return true;
    } else {

		return false;
	}
}

/* Get Random number */
this.random_number = function(length) {

    var possiblenumber = "0123456789";
    var number = '';
    for(var i = 0; i < length; i++) {

        number += possiblenumber.charAt(Math.floor(Math.random()*possiblenumber.length));
    }
    return number;
}

/* Convert text into mysql real string */
this.mysql_real_escape_string = function(str) {
    
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

/* Send email */
this.send_email = function(to_email, subject_msg, message) {

    var ses = new aws.SES({apiVersion: '2012-05-04'});
    var to = [to_email];
    var result_error = true;
    from = 'Skeuomo <no-reply@skeuomo.com>';
    
    ses.sendEmail({
        Source: from,
        Destination: { ToAddresses: to },
        Message: {
            Subject: {
                Data: subject_msg
            },
            Body: {
                Html: {
                    Data: message,
                }
            }
        }
    }, function(error, result) {

        if(error) {

            console.log('----------------Error in send Email---------');
            console.log(error);
            console.log('--------------------------------------------');
        }
    });
}

String.prototype.ucwords = function() {

    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($1) {
        return $1.toUpperCase();
    });
}

this.formateText = function(strTxt, callback) {

    function replaceAsterisk(processData) {

        return new Promise(function(resolve, reject) {

            //var matches_asterisk = processData.match(/(^|\W)\*\w+\*(\W|$)/g);
            //var matches_asterisk = processData.match(/(^|\W)\*[^*]*(\W|$)/g);
            //var matches_asterisk = processData.match(/(^|\W)\*([^\*]+)\*(\W|$)/g);
            var matches_asterisk = processData.match(/(^|)\*([^\*]+)\*(|$)/g);
            if(matches_asterisk != null) {

                for (var i = 0; i < matches_asterisk.length; i++) {

                    var asterisk_str = matches_asterisk[i];
                    function replaceAll(str, term, replacement) {
                      return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
                    }
                    processData = replaceAll(processData, asterisk_str.trim(), '<b>'+asterisk_str.replace(/\*/g, '').trim()+'</b>');
                }
            }
            resolve(processData);
        });
    }
    function replaceUnderscore(processData) {

        return new Promise(function(resolve, reject) {

            //var matches_underscore = processData.match(/(^|\W)\_\w+\_(\W|$)/g);
            //var matches_underscore = processData.match(/(^|\W)\_[^*]_(\W|$)/g);
            //var matches_underscore = processData.match(/(^|\W)\_([^\_]+)\_(\W|$)/g);
            var matches_underscore = processData.match(/(^|)\_([^\_]+)\_(|$)/g);
            if(matches_underscore != null) {
                for (var i = 0; i < matches_underscore.length; i++) {
                    
                    var underscore_str = matches_underscore[i];
                    function replaceAll(str, term, replacement) {
                      return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
                    }
                    processData = replaceAll(processData, underscore_str.trim(), '<i>'+underscore_str.replace(/\_/g, '').trim()+'</i>');
                }
            }
            resolve(processData);
        });
    }
    function replaceTilde(processData) {

        return new Promise(function(resolve, reject) {

            //var matches_tilde = processData.match(/(^|\W)\~\w+\~(\W|$)/g);
            //var matches_tilde = processData.match(/(^|\W)\~[^*]~(\W|$)/g);
            //var matches_tilde = processData.match(/(^|\W)\~([^\~]+)\~(\W|$)/g);
            var matches_tilde = processData.match(/(^|)\~([^\~]+)\~(|$)/g);
            if(matches_tilde != null) {

                for (var i = 0; i < matches_tilde.length; i++) {
                    
                    var tilde_str = matches_tilde[i];
                    function replaceAll(str, term, replacement) {
                      return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
                    }
                    processData = replaceAll(processData, tilde_str.trim(), '<s>'+tilde_str.replace(/\~/g, '').trim()+'</s>');
                }
            }
            resolve(processData);
        });
    }
    function replaceCharacters(processData) {

        return new Promise(function(resolve, reject) {

            //var matches_characters = processData.match(/(^|\W)\`\`\`\w+\`\`\`(\W|$)/g);
            //var matches_characters = processData.match(/(^|\W)\`\`\`[^*]`\`\`(\W|$)/g);
            //var matches_characters = processData.match(/(^|\W)\`\`\`([^\`\`\`]+)\`\`\`(\W|$)/g);
            var matches_characters = processData.match(/(^|)\`\`\`([^\`\`\`]+)\`\`\`(|$)/g);
            if(matches_characters != null) {

                for (var i = 0; i < matches_characters.length; i++) {
                    
                    var characters_str = matches_characters[i];
                    function replaceAll(str, term, replacement) {
                      return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
                    }
                    processData = replaceAll(processData, characters_str.trim(), '<tt>'+characters_str.replace(/\`\`\`/g, '').trim()+'</tt>');
                }
            }
            resolve(processData);
        });
    }

    replaceAsterisk(strTxt)
    .then(result_asterisk => {

        return replaceUnderscore(result_asterisk);
    })
    .then(result_underscore => {

        return replaceTilde(result_underscore);
    })
    .then(result_tilde => {
        
        return replaceCharacters(result_tilde);
    })
    .then(final_resul => {

        callback(final_resul);
    })
    .catch(error => {
        console.log(error);
        callback(null);
    })
}

Number.prototype.round = function(decimals) {

    return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
}
