const { appConfig:
    {
        experienceLevel0,
        experienceLevel1,
        language,
        fluency,
        mentoring
    } } = require("../config/appConfig");
const { fetchPost } = require("./fetchPost");
const { randArrItems } = require("./randArrItems");


const comboBuilder = async (c1, c2, c3, searchJobsUrl, searchPeopleUrl) => {

    const jobsPayload = (criterion) => {
        return {
            "skill/role": { text: criterion, experience: experienceLevel0 }
        }
    }

    const { results: jobsC1 } = await fetchPost(searchJobsUrl, jobsPayload(c1));
    const { results: jobsC2 } = await fetchPost(searchJobsUrl, jobsPayload(c2));
    const { results: jobsC3 } = await fetchPost(searchJobsUrl, jobsPayload(c3));
    const selectedJobs = [
        ...randArrItems(jobsC1, 1),
        ...randArrItems(jobsC2, 1),
        ...randArrItems(jobsC3, 1)
    ];

    const mentorsPayload = (criterion) => {
        return {
            and: [
                { "skill/role": { text: criterion, experience: experienceLevel1 } }, { language: { term: language, fluency: fluency } }, { "skill/role": { text: mentoring, experience: experienceLevel0 } }
            ]
        }
    }

    const { results: mentorsC1 } = await fetchPost(searchPeopleUrl, mentorsPayload(c1));
    const { results: mentorsC2 } = await fetchPost(searchPeopleUrl, mentorsPayload(c2));
    const { results: mentorsC3 } = await fetchPost(searchPeopleUrl, mentorsPayload(c3));
    const selectedMentors = [
        ...randArrItems(mentorsC1, 1),
        ...randArrItems(mentorsC2, 1),
        ...randArrItems(mentorsC3, 1)
    ];

    return {
        jobs: selectedJobs,
        mentors: selectedMentors
    }

}

module.exports = { comboBuilder };