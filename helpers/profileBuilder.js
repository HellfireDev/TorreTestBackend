const { randArrItems } = require("./randArrItems");

const profileBuilder = (torreBioData) => {
    const { strengths, interests, experiences } = torreBioData;
    const randStrengths = randArrItems(strengths, 3);
    const randIterests = randArrItems(interests, 3);
    const randExperiences = randArrItems(experiences, 3);

    return {
        strengths: randStrengths,
        interests: randIterests,
        experiences: randExperiences
    };
}

module.exports = { profileBuilder };