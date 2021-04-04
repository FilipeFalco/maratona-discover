const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile")

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    save(req, res) {
        const jobs = Job.get();
        const lastJobID = jobs[jobs.length - 1]?.id || 0;

        jobs.push({
            id: lastJobID + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            createdAt: Date.now() // atribuindo uma nova data
        });
        return res.redirect('/');
    },

    show(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();
        const jobID = req.params.id;

        const job = jobs.find((job) => Number(job.id) === Number(jobID));

        if(!job) {
            return res.send("Job not found!")
        }
        
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render("job-edit", { job });
    },

    update(req,res) {
        const jobs = Job.get();
        const jobID = req.params.id;

        const job = jobs.find((job) => Number(job.id) === Number(jobID));

        if(!job) {
            return res.send("Job not found!");
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobs.map(job => {
            if(Number(job.id) === Number(jobID)) {
                job = updatedJob;
            }                
            return job;
        })

        Job.update(newJobs);

        res.redirect("/job/" + jobID);
    },

    delete(req, res) {
        const jobID = req.params.id;

        Job.delete(jobID);
        
        return res.redirect("/");
    }
}