function formatDate(timeData) {
    const formattedDate = new Date(timeData);
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    return formattedDate.toLocaleDateString('en-US', options);
}

// const DateFormatter = {
//     formatDate,
// }


module.exports = DateFormatter = {
    formatDate,
};