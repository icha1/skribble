var Profile = require('../models/Profile')
var bcrypt = require('bcrypt')

module.exports = {

	get: function(params, isRaw, callback){
		Profile.find(params, function(err, profiles){
			if (err){
				if (callback != null)
					callback(err, null)

				return
			}

			if (callback != null){
				if (isRaw == true){
					callback(null, profiles)
					return
				}

				var summaries = []
				for (var i=0; i<profiles.length; i++){
					var profile = profiles[i]
					summaries.push(profile.summary())
				}

				callback(null, summaries)

			}
		})
	},

	getById: function(id, isRaw, callback){
		Profile.findById(id, function(err, profile){
			if (err){
				if (callback != null)
					callback({message:'Profile Not Found'}, null)

				return
			}

			if (callback != null)
				callback(null, profile.summary())
		})
	},

	post: function(params, callback){
		var password = params['password'] // plain text password
		var hashedPassword = bcrypt.hashSync(password, 10)
		params['password'] = hashedPassword

		Profile.create(params, function(err, profile){
			if (err){
				if (callback != null)
					callback(err, null)

				return
			}

			if (callback != null)
				callback(null, profile.summary())
		})
	},

	put: function(id, params, callback){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err){
				if (callback != null)
					callback(err, null)

				return
			}

			if (callback != null)
				callback(null, profile.summary())
		})
	}


}