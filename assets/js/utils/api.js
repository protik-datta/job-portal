export const getJobList = new Promise((resolve, reject) => {
    fetch("https://remotive.com/api/remote-jobs")
    .then((res)=>{
        if(!res.ok){
            reject('Failed to fetch data');
        }
        return res.json();
    })
    .then((data)=>{
        resolve(data.jobs);
    })
    .catch((err)=>{
        reject(err);
    })
})

export const seeJobDetails = (jobId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://remotive.com/api/remote-jobs`)
      .then((res) => {
        if (!res.ok) {
          reject("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        const job = data.jobs.find((job) => job.id == jobId);
        if (job) {
          resolve(job);
        } else {
          reject("Job not found");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
