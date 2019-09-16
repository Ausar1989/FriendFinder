var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.join(friends);
    });

    app.post("/api/friends", function(req, res) {
        var totalDifference = 0;
        var bestMAtch = {
            name: "",
            photo: "",
            friendDiffernece: 1000
        };
        
        var userInput = req.body;
        var userName = userInput.name;
        var userScores = userInput.scores;
        
        var numbers = userScores.map(function(item) {
            return parseInt(item, 4);
        });
        userInput = {
            name: req.body.name,
            photo: req.body.photo,
            score: numbers
        };
        console.log("Name: " + userName);
        console.log("User score" + userScores);

        var sum = numbers.reduce((a, numbers) => a + numbers, 0);
        console.log("Sum of users score " + sum);
        console.log("Best match friend difference " + bestMAtch.friendDiffernece);
        console.log("+++++++++++++++++++======================");

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("total Difference " + totalDifference);
            console.log("Best match friend difference " + bestMAtch.friendDiffernece);

            var bestFriendScore = friends[i].scores.reduce((a, numbers) => a + numbers, 0);
            console.log("Total friend score " + bestFriendScore);
            totalDifference += Math.abs(sum -bestFriendScore);
            console.log("-----------------------> " + totalDifference);

            if(totalDifference <= bestMAtch.friendDiffernece){
               bestMAtch.name = friends[i].name;
               bestMAtch.photo = friends[i].photo;
               bestMAtch.friendDiffernece =totalDifference;
            }
            console.log(totalDifference + " Total Difference");
        }
        console.log(bestMAtch);
        friends.push(userInput);
        console.log("New User Added");
        console.log(userInput);
        res.join(bestMAtch);


    });
};

