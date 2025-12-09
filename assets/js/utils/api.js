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

export const getJobSearch = new Promise((resolve, reject) => {
  fetch("https://jobicy.com/api/v2/remote-jobs")
    .then((res) => {
      if (!res.ok) {
        reject("Failed to fetch data");
      }
      return res.json();
    })
    .then((data) => {
      resolve(data.jobs);
    })
    .catch((err) => {
      reject(err);
    });
});

const industrySlugs = [
  "admin-support",
  "business",
  "copywriting",
  "design-multimedia",
  "supporting",
  "data-science",
  "admin",
  "education",
  "accounting-finance",
  "healthcare",
  "hr",
  "legal",
  "marketing",
  "management",
  "dev",
  "seller",
  "seo",
  "smm",
  "engineering",
  "technical-support",
  "web-app-design",
];

export function loadAllIndustryJob() {
  return Promise.all(
    industrySlugs.map((slug) => {
      const url = `https://jobicy.com/api/v2/remote-jobs?industry=${slug}`;

      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return {
            total: data.jobs?.length || 0,
            jobs: data.jobs || [],
          };
        });
    })
  );
}
