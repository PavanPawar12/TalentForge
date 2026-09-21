// Shared client-side job filtering used by Jobs and Browse pages.
// Matches the search text against title, description, location,
// job type and company name, plus salary ranges like "3-6 LPA" / "20+ LPA".
export const filterJobsByText = (jobs = [], query = "") => {
  if (!query || !query.trim()) return jobs;
  const q = query.toLowerCase().trim();

  const rangeMatch = q.match(/(\d+)\s*-\s*(\d+)/);
  const plusMatch = q.match(/(\d+)\s*\+/);

  return jobs.filter((job) => {
    const haystack = [
      job?.title,
      job?.description,
      job?.location,
      job?.jobType,
      job?.company?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (rangeMatch) {
      const min = Number(rangeMatch[1]);
      const max = Number(rangeMatch[2]);
      const salary = Number(job?.salary);
      if (!isNaN(salary) && salary >= min && salary <= max) return true;
    }

    if (plusMatch) {
      const min = Number(plusMatch[1]);
      const salary = Number(job?.salary);
      if (!isNaN(salary) && salary >= min) return true;
    }

    return haystack.includes(q);
  });
};
