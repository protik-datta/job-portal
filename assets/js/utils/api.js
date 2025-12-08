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