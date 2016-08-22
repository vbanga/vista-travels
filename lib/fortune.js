var fortunes = [
        "Conquer your fears or they will conquer you-1.",
        "Rivers need springs-1.",
        "Do not fear what you don't know-1.",
        "You will have a pleasant surprise-1.",
        "Whenever possible, keep it simple-1.",
];

exports.getFortune = function() { return fortunes[
		Math.floor(Math.random() * fortunes.length)];
};