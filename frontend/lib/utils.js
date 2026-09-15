// create a funciton to convert date from 2026-08-24T14:18:43.171Z to dd mmm, yyyy
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
