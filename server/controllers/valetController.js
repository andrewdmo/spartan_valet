//http://www.darrenbeck.co.uk/nodejs/react/reacttutorial-part4/

const Valet = require('../models/News');

module.exports = {
    find: function(params, callback){
        News.find(params,'_id title teaser', function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    findById: function(id, callback){
        News.findById(id, function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    }
}