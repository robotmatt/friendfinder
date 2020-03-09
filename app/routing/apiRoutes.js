
module.exports = function (app, path) {

    // Import the friends list
    const friends = require(path.join(__dirname + "/../data/", "friends.js"));

    // GET Request to pull list of friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });
    
    // POST request to take input and 
    app.post("/api/friends", function (req, res) {
    
        let response = req.body;
        let scores = []
        friends.forEach((friend, friendIndex) => {
            let sum = 0;
            friend.scores.forEach((friendScore, scoreIndex) => {
                // TODO: Make positive
                sum += Math.abs(friendScore - response.scores[scoreIndex]);
                console.log(sum);
            });
            scores.push({
                "index": friendIndex,
                "value": sum
            });
        });
        // figure out the closest match by sorting the array
        scores.sort((a, b) => a.value - b.value);

        // console.log(scores)
        // console.log(friends[scores[0].index])
    
        // scores[0] now has the index of the closest match
        // Return closests match
        return res.json(friends[scores[0].index]);
    });
}