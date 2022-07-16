// returns today's date in string format dd/mm/yyy
module.exports.todayDate = () => {
    let todayDate = new Date();
    return `${todayDate.getDate()}-${todayDate.getMonth()}-${todayDate.getFullYear()}`;
};
