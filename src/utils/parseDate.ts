// this will parse the timestamp to a readable format i.e "10th July 2022" 
const parseDate = (timestamp: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const year = timestamp.getFullYear();

  return `${day} ${month} ${year}`;

};

export default parseDate;
